Javob: **Pete**.

Quyidagi koddagi `work()` funksiyasi tashqi leksik muhit havolasi orqali kelib chiqqan joydan `name` oladi:

![](lexenv-nested-work.svg)

Demak, natija bu yerda `"Pit"`.

Ammo agar `makeWorker()` da `let name` bo'lmasa, qidiruv tashqariga chiqib, yuqoridagi zanjirdan ko'rib turganimizdek global o'zgaruvchini oladi. Bunday holda, natija `John` bo'ladi.
