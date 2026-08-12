import {
    createImageFile,
    loadImage,
    weakRefCache,
    LAYOUTS,
    images,
    THUMBNAIL_PARAMS,
    stateObj,
} from "./utils.js";

export const state = new Proxy(stateObj, {
    set(target, property, value) {
        const previousValue = target[property];

        target[property] = value;

        if (previousValue !== value) {
            handleStateChange(target);
        }

        return true;
    },
});

// Elements.
const thumbnailsContainerEl = document.querySelector(".thumbnails-container");
const selectEl = document.querySelector(".select");
const previewContainerEl = document.querySelector(".previewContainer");
const canvasEl = document.querySelector(".canvas");
const createCollageBtn = document.querySelector(".btn-create-collage");
const startOverBtn = document.querySelector(".btn-start-over");
const downloadBtn = document.querySelector(".btn-download");
const spinnerContainerEl = document.querySelector(".spinnerContainer");
const spinnerTextEl = document.querySelector(".spinnerText");
const loggerContainerEl = document.querySelector(".loggerContainer");

// Renders.
// Render thumbnails previews.
images.forEach((img) => {
    const thumbnail = document.createElement("div");
    thumbnail.classList.add("thumbnail-item");

    thumbnail.innerHTML = `
        <img src='${img.img}?${THUMBNAIL_PARAMS}' class="img">
  `;

    thumbnail.addEventListener("click", (e) => handleSelection(e, img));

    thumbnailsContainerEl.appendChild(thumbnail);
});
// Render layouts select.
LAYOUTS.forEach((layout) => {
    const option = document.createElement("option");
    option.value = JSON.stringify(layout);
    option.innerHTML = layout.name;
    selectEl.appendChild(option);
});

const handleStateChange = (state) => {
    if (state.loading) {
        selectEl.disabled = true;
        createCollageBtn.disabled = true;
        startOverBtn.disabled = true;
        downloadBtn.disabled = true;
        previewContainerEl.classList.add("previewContainer--disabled");
        spinnerContainerEl.classList.remove("spinnerContainer--hidden");
        spinnerTextEl.innerText = "Loading...";
        canvasEl.classList.remove("canvas--ready");
    } else if (!state.loading) {
        selectEl.disabled = false;
        createCollageBtn.disabled = false;
        startOverBtn.disabled = false;
        downloadBtn.disabled = false;
        previewContainerEl.classList.remove("previewContainer--disabled");
        spinnerContainerEl.classList.add("spinnerContainer--hidden");
        canvasEl.classList.add("canvas--ready");
    }

    if (!state.selectedImages.size) {
        createCollageBtn.disabled = true;
        document.querySelectorAll(".badge").forEach((item) => item.remove());
    } else if (state.selectedImages.size && !state.loading) {
        createCollageBtn.disabled = false;
    }

    if (!state.collageRendered) {
        downloadBtn.disabled = true;
    } else if (state.collageRendered) {
        downloadBtn.disabled = false;
    }
};
handleStateChange(state);

const handleSelection = (e, imgName) => {
    const imgEl = e.currentTarget;

    imgEl.classList.toggle("thumbnail-item--selected");

    if (state.selectedImages.has(imgName)) {
        state.selectedImages.delete(imgName);
        state.selectedImages = new Set(state.selectedImages);
        imgEl.querySelector(".badge")?.remove();
    } else {
        state.selectedImages = new Set(state.selectedImages.add(imgName));

        const badge = document.createElement("div");
        badge.classList.add("badge");
        badge.innerHTML = `
            <div class="check" />
        `;
        imgEl.prepend(badge);
    }
};

// Make a wrapper function.
let getCachedImage;
(async () => {
    getCachedImage = await weakRefCache(loadImage);
})();

const calculateGridRows = (blobsLength) =>
    Math.ceil(blobsLength / state.currentLayout.columns);

const drawCollage = (images) => {
    state.drawing = true;

    let context = canvasEl.getContext("2d");

    /**
     * Calculate canvas dimensions based on the current layout.
     * */
    context.canvas.width =
        state.currentLayout.itemWidth * state.currentLayout.columns;
    context.canvas.height =
        calculateGridRows(images.length) * state.currentLayout.itemHeight;

    let currentRow = 0;
    let currentCanvasDx = 0;
    let currentCanvasDy = 0;

    for (let i = 0; i < images.length; i++) {
        /**
         * Get current row of the collage.
         * */
        if (i % state.currentLayout.columns === 0) {
            currentRow += 1;
            currentCanvasDx = 0;

            if (currentRow > 1) {
                currentCanvasDy += state.currentLayout.itemHeight;
            }
        }

        context.drawImage(
            images[i],
            0,
            0,
            images[i].width,
            images[i].height,
            currentCanvasDx,
            currentCanvasDy,
            state.currentLayout.itemWidth,
            state.currentLayout.itemHeight,
        );

        currentCanvasDx += state.currentLayout.itemWidth;
    }

    state.drawing = false;
    state.collageRendered = true;
};

const createCollage = async () => {
    state.loading = true;

    const images = [];

    for (const image of state.selectedImages.values()) {
        const blobImage = await getCachedImage(image.img);

        const url = URL.createObjectURL(blobImage);
        const img = await createImageFile(url);

        images.push(img);
        URL.revokeObjectURL(url);
    }

    state.loading = false;

    drawCollage(images);
};

/**
 * Clear all settled data to start over.
 * */
const startOver = () => {
    state.selectedImages = new Set();
    state.collageRendered = false;
    const context = canvasEl.getContext("2d");
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);

    document
        .querySelectorAll(".thumbnail-item--selected")
        .forEach((item) => item.classList.remove("thumbnail-item--selected"));

    loggerContainerEl.innerHTML = '<p class="logger-title">Logger:</p>';
};

const downloadCollage = () => {
    const date = new Date();
    const fileName = `Collage-${date.getDay()}-${date.getMonth()}-${date.getFullYear()}.png`;
    const img = canvasEl.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = fileName;
    link.href = img;
    link.click();
    link.remove();
};

const changeLayout = ({ target }) => {
    state.currentLayout = JSON.parse(target.value);
};

// Listeners.
selectEl.addEventListener("change", changeLayout);
createCollageBtn.addEventListener("click", createCollage);
startOverBtn.addEventListener("click", startOver);
downloadBtn.addEventListener("click", downloadCollage);
