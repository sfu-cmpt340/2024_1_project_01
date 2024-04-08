import argparse
import os

os.environ["KERAS_BACKEND"] = "tensorflow"

import keras
import tensorflow as tf

if __name__ == "__main__":
    argparser = argparse.ArgumentParser()
    argparser.add_argument(
        "--model", "-m", type=int, required=True, help="Model number (1-6)"
    )
    args = argparser.parse_args()

    model = keras.models.load_model(f"./api/training/models/model_{args.model}.keras")

    export_archive = keras.export.ExportArchive()
    export_archive.track(model)
    export_archive.add_endpoint(
        name="serve",
        fn=model.call,
        input_signature=[tf.TensorSpec(shape=(None, 480, 480, 3), dtype=tf.float32)],
    )
    export_archive.write_out(f"./api/training/models/model_{args.model}")
