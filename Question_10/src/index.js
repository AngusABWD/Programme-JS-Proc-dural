
function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}
function dropZone(event) {
    event.preventDefault();
    event.target.style.transform = "scale(1.2)";
    const affichage = document.querySelector("#" + event.target.id + " > div");
    affichage.remove();
}
function drop(event) {   
    const id = event.dataTransfer.getData("text")
    const draggableElement = document.querySelector("#" + id + " > div");
    const draggableElementClone = draggableElement.cloneNode(false);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);  
    document.getElementById(id).appendChild(draggableElementClone); 
    dropzone.style.transform = "scale(1)";
    event.dataTransfer.clearData();
}
