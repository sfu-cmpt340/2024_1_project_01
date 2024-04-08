import argparse

import keras
import matplotlib.pyplot as plt
import tensorflow as tf
from utils import (
    augmentation1,
    augmentation2,
    augmentation3,
    augmentation4,
    augmentation5,
    augmentation6,
    input_preprocess,
    to_dict,
    undict,
)

keras.utils.set_random_seed(42)


## Define plotting function for training history
def plot_hist(hist, plot_val=False):
    plt.plot(hist.history["accuracy"])
    plt.plot(hist.history["f1-score"])
    if plot_val:
        plt.plot(hist.history["val_accuracy"])
        plt.plot(hist.history["val_f1-score"])
        plt.legend(
            [
                "train accuracy",
                "train f1-score",
                "validation accuracy",
                "validation f1-score",
            ],
            loc="upper left",
        )
    else:
        plt.legend(["train accuracy", "train f1-score"], loc="upper left")
    plt.title("model accuracy")
    plt.xlabel("epoch")
    plt.show()


## Define train set loader
def load_train_set(image_size, batch_size, augmentation):
    train_ds = keras.utils.image_dataset_from_directory(
        "./api/training/sd198/train",
        image_size=image_size,
        batch_size=batch_size,
    )

    train_ds = train_ds.map(input_preprocess, num_parallel_calls=tf.data.AUTOTUNE)

    train_ds = train_ds.map(to_dict, num_parallel_calls=tf.data.AUTOTUNE)

    if augmentation == 1:  # RandAugment + MixUp
        train_ds = train_ds.map(augmentation1, num_parallel_calls=tf.data.AUTOTUNE)
    elif augmentation == 2:  # RandAugment + CutMix
        train_ds = train_ds.map(augmentation2, num_parallel_calls=tf.data.AUTOTUNE)
    elif augmentation == 3:  # RandAugment + FourierMix
        train_ds = train_ds.map(augmentation3, num_parallel_calls=tf.data.AUTOTUNE)
    elif augmentation == 4:  # CutMix + MixUp
        train_ds = train_ds.map(augmentation4, num_parallel_calls=tf.data.AUTOTUNE)
    elif augmentation == 5:  # FourierMix + MixUp
        train_ds = train_ds.map(augmentation5, num_parallel_calls=tf.data.AUTOTUNE)
    elif augmentation == 6:  # RandAugment + CutMix + MixUp
        train_ds = train_ds.map(augmentation6, num_parallel_calls=tf.data.AUTOTUNE)

    train_ds = train_ds.map(undict, num_parallel_calls=tf.data.AUTOTUNE)

    train_ds = train_ds.prefetch(buffer_size=tf.data.AUTOTUNE)

    return train_ds


## Define model loader
def load_model(
    input_shape, num_classes, first_decay_steps, gradient_accumulation_steps
):
    inputs = keras.layers.Input(shape=input_shape)
    base_model = keras.applications.EfficientNetV2M(
        include_top=False,
        input_tensor=inputs,
    )
    for i, layer in enumerate(base_model.layers):
        if i >= 85 and not isinstance(layer, keras.layers.BatchNormalization):
            layer.trainable = True
        else:
            layer.trainable = False

    x = keras.layers.GlobalAveragePooling2D()(base_model.output)
    x = keras.layers.BatchNormalization()(x)
    x = keras.layers.Dropout(rate=0.5)(x)

    outputs = keras.layers.Dense(units=num_classes, activation="softmax")(x)

    model = keras.Model(inputs, outputs, name="EfficientNet")

    # Compiles the model with the AdamW optimizer
    model.compile(
        optimizer=keras.optimizers.AdamW(
            learning_rate=keras.optimizers.schedules.CosineDecayRestarts(
                initial_learning_rate=1e-5,
                first_decay_steps=first_decay_steps,
                alpha=1e-2,
            ),
            weight_decay=1e-3,
            gradient_accumulation_steps=gradient_accumulation_steps,
        ),
        loss=keras.losses.CategoricalFocalCrossentropy(label_smoothing=0.1),
        metrics=[
            keras.metrics.CategoricalAccuracy(name="accuracy"),
            keras.metrics.F1Score(name="f1-score", average="weighted"),
        ],
    )

    return model


## Define model trainer
def train_model(model, model_number, train_ds, num_epochs):
    hist = model.fit(
        train_ds,
        epochs=num_epochs,
        callbacks=[
            keras.callbacks.BackupAndRestore("./api/training/backup"),
            keras.callbacks.ModelCheckpoint(
                filepath=f"./api/training/models/model_{model_number}.keras",
                monitor="loss",
                save_best_only=True,
            ),
        ],
    )
    return hist


## Main function
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--model", "-m", type=int, required=True, help="Model number (1-6)"
    )
    args = parser.parse_args()

    # Set hyperparameters
    num_classes = 198
    image_dim = 480
    image_size = (image_dim, image_dim)
    input_shape = (image_dim, image_dim, 3)
    batch_size = 16
    gradient_accumulation_steps = 2
    first_decay_steps = 660
    num_epochs = 500

    # Load the training set of SD-198
    train_ds = load_train_set(
        image_size=image_size, batch_size=batch_size, augmentation=args.model
    )

    # Load the model, freeze the first 85 layers, and compile the model
    model = load_model(
        input_shape=input_shape,
        num_classes=num_classes,
        first_decay_steps=first_decay_steps,
        gradient_accumulation_steps=gradient_accumulation_steps,
    )

    # Train the model for 500 epochs
    hist = train_model(
        model=model, model_number=args.model, train_ds=train_ds, num_epochs=num_epochs
    )
    plot_hist(hist)
