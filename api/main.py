import io
import json
from base64 import b64decode

import jax
import keras
from flask import Flask, request
from keras.preprocessing.image import img_to_array, load_img

app = Flask(__name__)

# Load EfficientNetV2M trained on SD-198
print("Loading model...")
model = keras.saving.load_model("./api/model.keras")
print("Model loaded!")

# Labels for the model
labels = [
    "Acne_Keloidalis_Nuchae",
    "Acne_Vulgaris",
    "Acrokeratosis_Verruciformis",
    "Actinic_solar_Damage(Actinic_Cheilitis)",
    "Actinic_solar_Damage(Actinic_Keratosis)",
    "Actinic_solar_Damage(Cutis_Rhomboidalis_Nuchae)",
    "Actinic_solar_Damage(Pigmentation)",
    "Actinic_solar_Damage(Solar_Elastosis)",
    "Actinic_solar_Damage(Solar_Purpura)",
    "Actinic_solar_Damage(Telangiectasia)",
    "Acute_Eczema",
    "Allergic_Contact_Dermatitis",
    "Alopecia_Areata",
    "Androgenetic_Alopecia",
    "Angioma",
    "Angular_Cheilitis",
    "Aphthous_Ulcer",
    "Apocrine_Hydrocystoma",
    "Arsenical_Keratosis",
    "Balanitis_Xerotica_Obliterans",
    "Basal_Cell_Carcinoma",
    "Beau's_Lines",
    "Becker's_Nevus",
    "Behcet's_Syndrome",
    "Benign_Keratosis",
    "Blue_Nevus",
    "Bowen's_Disease",
    "Bowenoid_Papulosis",
    "Cafe_Au_Lait_Macule",
    "Callus",
    "Candidiasis",
    "Cellulitis",
    "Chalazion",
    "Clubbing_of_Fingers",
    "Compound_Nevus",
    "Congenital_Nevus",
    "Crowe's_Sign",
    "Cutanea_Larva_Migrans",
    "Cutaneous_Horn",
    "Cutaneous_T-Cell_Lymphoma",
    "Cutis_Marmorata",
    "Darier-White_Disease",
    "Dermatofibroma",
    "Dermatosis_Papulosa_Nigra",
    "Desquamation",
    "Digital_Fibroma",
    "Dilated_Pore_of_Winer",
    "Discoid_Lupus_Erythematosus",
    "Disseminated_Actinic_Porokeratosis",
    "Drug_Eruption",
    "Dry_Skin_Eczema",
    "Dyshidrosiform_Eczema",
    "Dysplastic_Nevus",
    "Eccrine_Poroma",
    "Eczema",
    "Epidermal_Nevus",
    "Epidermoid_Cyst",
    "Epithelioma_Adenoides_Cysticum",
    "Erythema_Ab_Igne",
    "Erythema_Annulare_Centrifigum",
    "Erythema_Craquele",
    "Erythema_Multiforme",
    "Exfoliative_Erythroderma",
    "Factitial_Dermatitis",
    "Favre_Racouchot",
    "Fibroma",
    "Fibroma_Molle",
    "Fixed_Drug_Eruption",
    "Follicular_Mucinosis",
    "Follicular_Retention_Cyst",
    "Fordyce_Spots",
    "Frictional_Lichenoid_Dermatitis",
    "Ganglion",
    "Geographic_Tongue",
    "Granulation_Tissue",
    "Granuloma_Annulare",
    "Green_Nail",
    "Guttate_Psoriasis",
    "Hailey_Hailey_Disease",
    "Half_and_Half_Nail",
    "Halo_Nevus",
    "Herpes_Simplex_Virus",
    "Herpes_Zoster",
    "Hidradenitis_Suppurativa",
    "Histiocytosis_X",
    "Hyperkeratosis_Palmaris_Et_Plantaris",
    "Hypertrichosis",
    "Ichthyosis",
    "Impetigo",
    "Infantile_Atopic_Dermatitis",
    "Inverse_Psoriasis",
    "Junction_Nevus",
    "Keloid",
    "Keratoacanthoma",
    "Keratolysis_Exfoliativa_of_Wende",
    "Keratosis_Pilaris",
    "Kerion",
    "Koilonychia",
    "Kyrle's_Disease",
    "Leiomyoma",
    "Lentigo_Maligna_Melanoma",
    "Leukocytoclastic_Vasculitis",
    "Leukonychia",
    "Lichen_Planus",
    "Lichen_Sclerosis_Et_Atrophicus",
    "Lichen_Simplex_Chronicus",
    "Lichen_Spinulosis",
    "Linear_Epidermal_Nevus",
    "Lipoma",
    "Livedo_Reticularis",
    "Lymphangioma_Circumscriptum",
    "Lymphocytic_Infiltrate_of_Jessner",
    "Lymphomatoid_Papulosis",
    "Mal_Perforans",
    "Malignant_Melanoma",
    "Median_Nail_Dystrophy",
    "Melasma",
    "Metastatic_Carcinoma",
    "Milia",
    "Molluscum_Contagiosum",
    "Morphea",
    "Mucha_Habermann_Disease",
    "Mucous_Membrane_Psoriasis",
    "Myxoid_Cyst",
    "Nail_Dystrophy",
    "Nail_Nevus",
    "Nail_Psoriasis",
    "Nail_Ridging",
    "Neurodermatitis",
    "Neurofibroma",
    "Neurotic_Excoriations",
    "Nevus_Comedonicus",
    "Nevus_Incipiens",
    "Nevus_Sebaceous_of_Jadassohn",
    "Nevus_Spilus",
    "Nummular_Eczema",
    "Onychogryphosis",
    "Onycholysis",
    "Onychomycosis",
    "Onychoschizia",
    "Paronychia",
    "Pearl_Penile_Papules",
    "Perioral_Dermatitis",
    "Pincer_Nail_Syndrome",
    "Pitted_Keratolysis",
    "Pityriasis_Alba",
    "Pityriasis_Rosea",
    "Pityrosporum_Folliculitis",
    "Poikiloderma_Atrophicans_Vasculare",
    "Pomade_Acne",
    "Pseudofolliculitis_Barbae",
    "Pseudorhinophyma",
    "Psoriasis",
    "Pustular_Psoriasis",
    "Pyoderma_Gangrenosum",
    "Pyogenic_Granuloma",
    "Racquet_Nail",
    "Radiodermatitis",
    "Rhinophyma",
    "Rosacea",
    "Scalp_Psoriasis",
    "Scar",
    "Scarring_Alopecia",
    "Schamberg's_Disease",
    "Sebaceous_Gland_Hyperplasia",
    "Seborrheic_Dermatitis",
    "Seborrheic_Keratosis",
    "Skin_Tag",
    "Solar_Lentigo",
    "Stasis_Dermatitis",
    "Stasis_Edema",
    "Stasis_Ulcer",
    "Steroid_Acne",
    "Steroid_Striae",
    "Steroid_Use_abusemisuse_Dermatitis",
    "Stomatitis",
    "Strawberry_Hemangioma",
    "Striae",
    "Subungual_Hematoma",
    "Syringoma",
    "Terry's_Nails",
    "Tinea_Corporis",
    "Tinea_Cruris",
    "Tinea_Faciale",
    "Tinea_Manus",
    "Tinea_Pedis",
    "Tinea_Versicolor",
    "Toe_Deformity",
    "Trichilemmal_Cyst",
    "Trichofolliculoma",
    "Trichostasis_Spinulosa",
    "Ulcer",
    "Urticaria",
    "Varicella",
    "Verruca_Vulgaris",
    "Vitiligo",
    "Wound_Infection",
    "Xerosis",
]


@app.route("/classify", methods=["POST"])
def classify() -> json:
    # Get image from user
    data = request.get_json()
    image_data = data["image"]
    print("Image data received")

    # Decode image data and convert to PIL Image
    image_bytes = b64decode(image_data.split(",")[1])
    image = load_img(io.BytesIO(image_bytes), target_size=(480, 480))

    # Preprocess image for the model
    image = img_to_array(image)
    image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))

    # Predict the class
    print("Predicting class...")
    predictions = model.predict(image)

    top_predictions = sorted(
        zip(predictions[0], labels), key=lambda x: x[0], reverse=True
    )[:5]
    top_predictions = {label: f"{prob * 100:.2f}%" for prob, label in top_predictions}

    print("Predictions made!")
    print(top_predictions)

    return top_predictions


if __name__ == "__main__":
    app.run()
