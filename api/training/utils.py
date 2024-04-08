import keras_cv
import tensorflow as tf


def to_dict(image, label):
    return {"images": image, "labels": label}


def undict(inputs):
    return inputs["images"], inputs["labels"]


def input_preprocess(image, label, num_classes=198):
    label = tf.one_hot(label, num_classes)
    return image, label


def augmentation1(inputs):
    inputs["images"] = keras_cv.layers.RandAugment(value_range=[0, 255])(
        inputs["images"]
    )
    inputs = keras_cv.layers.MixUp()(inputs)
    return inputs


def augmentation2(inputs):
    inputs["images"] = keras_cv.layers.RandAugment(value_range=[0, 255])(
        inputs["images"]
    )
    inputs = keras_cv.layers.CutMix()(inputs)
    return inputs


def augmentation3(inputs):
    inputs["images"] = keras_cv.layers.RandAugment(value_range=[0, 255])(
        inputs["images"]
    )
    inputs = keras_cv.layers.FourierMix()(inputs)
    return inputs


def augmentation4(inputs):
    inputs = keras_cv.layers.CutMix()(inputs)
    inputs = keras_cv.layers.MixUp()(inputs)
    return inputs


def augmentation5(inputs):
    inputs = keras_cv.layers.FourierMix()(inputs)
    inputs = keras_cv.layers.MixUp()(inputs)
    return inputs


def augmentation6(inputs):
    inputs["images"] = keras_cv.layers.RandAugment(value_range=[0, 255])(
        inputs["images"]
    )
    inputs = keras_cv.layers.CutMix()(inputs)
    inputs = keras_cv.layers.MixUp()(inputs)
    return inputs
