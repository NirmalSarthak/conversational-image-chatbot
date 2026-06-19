from ultralytics import YOLO
from app.utils.image_utils import read_image_from_upload, validate_image_format

model = YOLO("yolov8n.pt")

def detect_objects(image_file):
    validate_image_format(image_file)
    image = read_image_from_upload(image_file)

    results = model(image)

    detected_objects = set()
    for r in results:
        for box in r.boxes:
            cls_id = int(box.cls[0])
            detected_objects.add(model.names[cls_id])

    return list(detected_objects)
