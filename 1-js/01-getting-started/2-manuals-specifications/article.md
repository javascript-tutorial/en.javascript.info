
# Qo'llanma va Ko'rsatmalar

Bu kitob qisqa-o'quv qo'llanma hisoblanadi. Bu kitobning maqsadi sizga tilni asta-sekin o'rgatishdir. Lekin, siz boshlang'ich narsalar bilan tanishib bo'lganingizdan kegin, sizga boshqa manbalar kerak bo'ladi.
## ko'rsatma
[The ECMA-262 specification](https://www.ecma-international.org/publications/standards/Ecma-262.htm) Javascript haqida eng chuqur, batafsil va rasmiy ma'lumotlarni o'z ichiga oladi. U tilni yoritib, izohlab beradi.
This book is a *tutorial*. It aims to help you gradually learn the language. But once you're familiar with the basics, you'll need other resources.

Ammo u rasmiy bo'lishi bilan bir qatorda, dastlab uni tushunish qiyin. Shuning uchun, agar sizga til tafsilotlari haqida eng ishonchli ma'lumotlar manbasi kerak bo'lsa, bu ko'rsatmalar siz uchun to'g'ri joy.Ammo bu kundalik foydalanishda ishlatilmaydi.



Har yili yangi ko’rsatmalar varianti(versiyasi) chiqariladi. Ushbu versiyalarning orasida eng so'nggi qo'llanmani  htt <https://tc39.es/ecma262/> dan topsa bo'ladi. 
A new specification version is released every year. Between these releases, the latest specification draft is at <https://tc39.es/ecma262/>.


Eng so'ngi xususiyatlar jumladan "almost standard" "Deyarli standart" ("3-bosqich" deb ataladigan) haqida bilish uchun https://github.com/tc39/proposals>. saytidagi takliflarni ko’rib chiqing.

Bundan tashqari, agar siz brauzer bo'yicha ishlayotkan bo'lsangiz, qo'llanmaning ikkinchi qismida boshqa ko'rsatmalar ham mavjud [second part](info:browser-environment).

## Yo'riqnoma

- **MDN (Mozilla) JavaScript Reference** misollar va boshqa maʼlumotlarga ega bo'lgan asosiy qoʻllanmadir.Tilning individual funktsiyalari, usullari va boshqalar haqida chuqur ma'lumot olish bu - juda yaxshi.  

    Buni <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference> sahifasidan topsangiz bo'ladi.
    You can find it at <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>.

Although, it's often best to use an internet search instead. Just use "MDN [term]" in the query, e.g. <https://google.com/search?q=MDN+parseInt> to search for the `parseInt` function.

Lekin internetdan izlanish ko'pincha eng yaxshisi yo'l hisonblanadi. So'rovda shunchaki "MDN [term]" foydalaning. Masalan, `parseInt` funksiyasini qidirish uchun <https://google.com/search?q=MDN+parseInt> dan foydalaning. 
## Salohiyat jadvallari                                                                        

JavaScript rivojlanayotgan til bo'lib, yangi xususiyatlar muntazam qo'shiladi.

Ularning brauzer va boshqa enjinlar(engine) ga asoslangan qo'llovini ko'rish uchun quyidagilarni ko'rib chiqing:

- <http://caniuse.com> - har bir xususiyat uchun qo'llab-quvvatlash jadvallari, masalan: Qaysi enjin zamonaviy kriptografiya funktsiyalarini qo'llab-quvvatlashini ko'rish uchun: <http://caniuse.com/#feat=cryptography>.
- <https://kangax.github.io/compat-table> - til xususiyatlariga va ularni qo'llaydigan yoki qo'llamaydigan enjin(engine) larga ega jadval.

Bu resurslarning barchasi real hayotni rivojlantirishda foydali, chunki ular til tafsilotlari, ularni qo'llab-quvvatlash va boshqalar haqida qimmatli ma'lumotlarni o'z ichiga oladi.
 Iltimos, sizga biror dastur to'grisida batafsil ma'lumot kerak bo'lip qolishi mumkin bo'lgan vaziyatlar uchun ularni hammasini (yoki shu betni) eslab qoling. 
- <https://caniuse.com> - per-feature tables of support, e.g. to see which engines support modern cryptography functions: <https://caniuse.com/#feat=cryptography>.
- <https://kangax.github.io/compat-table> - a table with language features and engines that support those or don't support.

All these resources are useful in real-life development, as they contain valuable information about language details, their support, etc.

Please remember them (or this page) for the cases when you need in-depth information about a particular feature.
