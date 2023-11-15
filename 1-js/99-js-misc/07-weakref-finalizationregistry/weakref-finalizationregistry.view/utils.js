const loggerContainerEl = document.querySelector(".loggerContainer");

export const images = [
    {
        img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    },
    {
        img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    },
    {
        img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60",
    },
    {
        img: "https://images.unsplash.com/photo-1500835556837-99ac94a94552",
    },
    {
        img: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
    },
    {
        img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    {
        img: "https://images.unsplash.com/photo-1528543606781-2f6e6857f318",
    },
    {
        img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
    },
    {
        img: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3",
    },
    {
        img: "https://images.unsplash.com/photo-1533105079780-92b9be482077",
    },
    {
        img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
    },
    {
        img: "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7",
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1663047367140-91adf819d007",
    },
    {
        img: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd",
    },
    {
        img: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd",
    },
    {
        img: "https://images.unsplash.com/photo-1518684079-3c830dcef090",
    },
    {
        img: "https://images.unsplash.com/photo-1505832018823-50331d70d237",
    },
    {
        img: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9",
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1661277758451-b5053309eea1",
    },
    {
        img: "https://images.unsplash.com/photo-1541410965313-d53b3c16ef17",
    },
    {
        img: "https://images.unsplash.com/photo-1528702748617-c64d49f918af",
    },
    {
        img: "https://images.unsplash.com/photo-1502003148287-a82ef80a6abc",
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1661281272544-5204ea3a481a",
    },
    {
        img: "https://images.unsplash.com/photo-1503457574462-bd27054394c1",
    },
    {
        img: "https://images.unsplash.com/photo-1499363536502-87642509e31b",
    },
    {
        img: "https://images.unsplash.com/photo-1551918120-9739cb430c6d",
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1661382219642-43e54f7e81d7",
    },
    {
        img: "https://images.unsplash.com/photo-1497262693247-aa258f96c4f5",
    },
    {
        img: "https://images.unsplash.com/photo-1525254134158-4fd5fdd45793",
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1661274025419-4c54107d5c48",
    },
    {
        img: "https://images.unsplash.com/photo-1553697388-94e804e2f0f6",
    },
    {
        img: "https://images.unsplash.com/photo-1574260031597-bcd9eb192b4f",
    },
    {
        img: "https://images.unsplash.com/photo-1536323760109-ca8c07450053",
    },
    {
        img: "https://images.unsplash.com/photo-1527824404775-dce343118ebc",
    },
    {
        img: "https://images.unsplash.com/photo-1612278675615-7b093b07772d",
    },
    {
        img: "https://images.unsplash.com/photo-1522010675502-c7b3888985f6",
    },
    {
        img: "https://images.unsplash.com/photo-1501555088652-021faa106b9b",
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1669223469435-27e091439169",
    },
    {
        img: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96",
    },
    {
        img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f",
    },
    {
        img: "https://images.unsplash.com/photo-1553342385-111fd6bc6ab3",
    },
    {
        img: "https://images.unsplash.com/photo-1516546453174-5e1098a4b4af",
    },
    {
        img: "https://images.unsplash.com/photo-1527142879-95b61a0b8226",
    },
    {
        img: "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45",
    },
    {
        img: "https://images.unsplash.com/photo-1516939884455-1445c8652f83",
    },
    {
        img: "https://images.unsplash.com/photo-1545389336-cf090694435e",
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1669223469455-b7b734c838f4",
    },
    {
        img: "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a",
    },
    {
        img: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40",
    },
    {
        img: "https://images.unsplash.com/photo-1506125840744-167167210587",
    },
    {
        img: "https://images.unsplash.com/photo-1522199873717-bc67b1a5e32b",
    },
    {
        img: "https://images.unsplash.com/photo-1495904786722-d2b5a19a8535",
    },
    {
        img: "https://images.unsplash.com/photo-1614094082869-cd4e4b2905c7",
    },
    {
        img: "https://images.unsplash.com/photo-1474755032398-4b0ed3b2ae5c",
    },
    {
        img: "https://images.unsplash.com/photo-1501554728187-ce583db33af7",
    },
    {
        img: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59",
    },
    {
        img: "https://images.unsplash.com/photo-1531141445733-14c2eb7d4c1f",
    },
    {
        img: "https://images.unsplash.com/photo-1500259783852-0ca9ce8a64dc",
    },
    {
        img: "https://images.unsplash.com/photo-1510662145379-13537db782dc",
    },
    {
        img: "https://images.unsplash.com/photo-1573790387438-4da905039392",
    },
    {
        img: "https://images.unsplash.com/photo-1512757776214-26d36777b513",
    },
    {
        img: "https://images.unsplash.com/photo-1518855706573-84de4022b69b",
    },
    {
        img: "https://images.unsplash.com/photo-1500049242364-5f500807cdd7",
    },
    {
        img: "https://images.unsplash.com/photo-1528759335187-3b683174c86a",
    },
];
export const THUMBNAIL_PARAMS = "w=240&h=240&fit=crop&auto=format";

// Console styles.
export const CONSOLE_BASE_STYLES = [
    "font-size: 12px",
    "padding: 4px",
    "border: 2px solid #5a5a5a",
    "color: white",
].join(";");
export const CONSOLE_PRIMARY = [
    CONSOLE_BASE_STYLES,
    "background-color: #13315a",
].join(";");
export const CONSOLE_SUCCESS = [
    CONSOLE_BASE_STYLES,
    "background-color: #385a4e",
].join(";");
export const CONSOLE_ERROR = [
    CONSOLE_BASE_STYLES,
    "background-color: #5a1a24",
].join(";");

// Layouts.
export const LAYOUT_4_COLUMNS = {
    name: "Layout 4 columns",
    columns: 4,
    itemWidth: 240,
    itemHeight: 240,
};
export const LAYOUT_8_COLUMNS = {
    name: "Layout 8 columns",
    columns: 8,
    itemWidth: 240,
    itemHeight: 240,
};
export const LAYOUTS = [LAYOUT_4_COLUMNS, LAYOUT_8_COLUMNS];

export const createImageFile = async (src) =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Failed to construct image."));
    });

export const loadImage = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(String(response.status));
        }

        return await response.blob();
    } catch (e) {
        console.log(`%cFETCHED_FAILED: ${e}`, CONSOLE_ERROR);
    }
};

export const weakRefCache = (fetchImg) => {
    const imgCache = new Map();
    const registry = new FinalizationRegistry(({ imgName, size, type }) => {
        const cachedImg = imgCache.get(imgName);
        if (cachedImg && !cachedImg.deref()) {
            imgCache.delete(imgName);
            console.log(
                `%cCLEANED_IMAGE: Url: ${imgName}, Size: ${size}, Type: ${type}`,
                CONSOLE_ERROR,
            );

            const logEl = document.createElement("div");
            logEl.classList.add("logger-item", "logger--error");
            logEl.innerHTML = `CLEANED_IMAGE: Url: ${imgName}, Size: ${size}, Type: ${type}`;
            loggerContainerEl.appendChild(logEl);
            loggerContainerEl.scrollTop = loggerContainerEl.scrollHeight;
        }
    });

    return async (imgName) => {
        const cachedImg = imgCache.get(imgName);

        if (cachedImg?.deref() !== undefined) {
            console.log(
                `%cCACHED_IMAGE: Url: ${imgName}, Size: ${cachedImg.size}, Type: ${cachedImg.type}`,
                CONSOLE_SUCCESS,
            );

            const logEl = document.createElement("div");
            logEl.classList.add("logger-item", "logger--success");
            logEl.innerHTML = `CACHED_IMAGE: Url: ${imgName}, Size: ${cachedImg.size}, Type: ${cachedImg.type}`;
            loggerContainerEl.appendChild(logEl);
            loggerContainerEl.scrollTop = loggerContainerEl.scrollHeight;

            return cachedImg?.deref();
        }

        const newImg = await fetchImg(imgName);
        console.log(
            `%cFETCHED_IMAGE: Url: ${imgName}, Size: ${newImg.size}, Type: ${newImg.type}`,
            CONSOLE_PRIMARY,
        );

        const logEl = document.createElement("div");
        logEl.classList.add("logger-item", "logger--primary");
        logEl.innerHTML = `FETCHED_IMAGE: Url: ${imgName}, Size: ${newImg.size}, Type: ${newImg.type}`;
        loggerContainerEl.appendChild(logEl);
        loggerContainerEl.scrollTop = loggerContainerEl.scrollHeight;

        imgCache.set(imgName, new WeakRef(newImg));
        registry.register(newImg, {
            imgName,
            size: newImg.size,
            type: newImg.type,
        });

        return newImg;
    };
};

export const stateObj = {
    loading: false,
    drawing: true,
    collageRendered: false,
    currentLayout: LAYOUTS[0],
    selectedImages: new Set(),
};
