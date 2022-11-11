# JavaScriptga Kirish

Keling, JavaScript nimasi bilan o'ziga xosligini, u bilan nimalarga erishishimiz mumkinligini va u bilan boshqa texnologiyalar qanday birga ishlashini ko'rib chiqamiz.

## JavaScript o'zi nima?

Dastlab, JavaScript "web sahifalarni jonli qilish" maqsadida yaratilgan edi.

Bu tilda yozilgan dasturlar skriptlar deb ataladi. Ular web sahifaning HTML qismida to'g'ridan to'gri yozilishi va sahifa yuklanishi bilan avtomatik ravishda ishga tushirilishi mumkin.

Skriptlar oddiy matn ko'rinishida beriladi va ko'rinadi. Ular ishlashi uchun maxsus tayyorgarlik 
yoki jamlash talab qilmaydi.

Bu jihati bilan JavaScript boshqa [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) deb atalgan dasturlash tilidan keskin farq qiladi.

```smart header="Nima uchun <u>Java</u>Script deb nomlanadi?"
JavaScript yaratilganda uning dastlabki nomi "LiveScript" edi. Lekin, o'sha paytda Java juda 
mashxurligi sababli yangi dasturlash tilini Javaning yosh ukasi sifatida tanishtirish
yordam beradi deb qaror qilingan.

Lekin, JavaScript rivojlangani sari [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript) deb atalgan o'ziga xosligiga ega to'liq mustaqil til bo'ldi va hozir Java bilan umuman bog'liqlik jihati yo'q. 
```

Bugun, JavaScript nafaqat brauzerda balki serverda ham yoki [JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine) deb atalgan maxsus dasturga ega har qanday qurilmada ishlay oladi. 

Brauzerning o'zida o'rnatilgan engine mavjud. Ba'zida u "JavaScript virtual machine" deb ham ataladi.

Turli enginelarning turli "kod nomlanishlari" mavjud. Masalan:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- Chrome, Opera va Edge brauzerlari uchun.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- in Firefox brauzeri uchun.
- ...Yana IE uchun "Chakra", Safari uchun "JavaScriptCore", "Nitro" va "SquirrelFish" deb
nomlangan va boshqa shu kabi kod nomlari mavjud.

Yuqoridagi terminlar eslab qolishga oson, chunki ulardan internetdagi dasturlashga oid 
maqolalarda keng foydalaniladi. Biz ham ulardan foydalanamiz. Misol uchun, agar "X xususiyat V8
tomonidan qo'llana olsa", demak u Chrome, Opera va Edge brauzerlarida ishlay oladi.

```smart header="Engine lar qanday ishlaydi?"

Engine lar aslida murakkab. Lekin asoslari ancha oson.

1. Engine (agar brauzerga o'rnatilgan bo'lsa) skriptlarni o'qiydi (tahlil qiladi).
2. Keyin skriptni mashina kodiga aylantiradi.
3. So'ngra mashina kodi ancha tez ishlaydi.

Engine jarayonning har bir bosqichida optimallashtirishlarni amalga oshiradi. U xatto jamlangan 
skriptni ishlashi davomida kuzatadi, u orqali borayotgan ma'lumotni taxlil qiladi va shu bilimga
asoslangan mashina kodini yanada optimizatsiya qiladi.
```

## Ichki-brauzer JavaScript nimalar qila oladi?

Zamonaviy JacaScript "xavsiz" dasturlash tilidir. U xotira yoki CPU ga kam darajali kirish 
ta'minlamaydi, chunki u dastlab uni talab qilmaydigan brauzerlar uchun yaratilgandi.

JavaScriptning qobiliyatlari u ishlab turgan muhitga katta bog'liq. Misol uchun, [Node.js](https://wikipedia.org/wiki/Node.js) JavaScript ga katta hajmdagi fayllarni o'qish/yozish ga yordam beradigan funksiyalarni
qo'llab quvvatlaydi, tizim so'rovlarini amalga oshiradi va hokazo.

Ichki-brauzer JavaScript web sahifalarni boshqarish, foydalanuvchi bilan aloqa qilish va web 
server bilan bog'liq hamma narsani qila oladi.

Misol uchun, ichki-brauzer JavaScript qodir:

- Sahifaga yangi HTML qo'shish, mavjud kontentni o'zgartirish, dizaynni o'zgartirishga.
- Foydalanuvchi harakatlariga reaksiya bildirish, sichqoncha bosilganda, kursor harakatlanganda va klaviatura bosilganda ma'lum harakatlarni amalga oshirishga.
- Uzoq serverlarga tizim orqali so'rovlar yuborish, yuklab olish va yuklashga ([AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) va [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) deb nomlanadigan texnologiyalar).
- Kokilar olish va o'rnatish, tashrif buyuruvchidan savollar so'rash, habarlar ko'rsatishga.
- Mijoz tomonda (ya'ni mahalliy xotirada) ma'lumotlarni saqlab qolishga.

## Ichki-brauzer JavaScript nimalar qila olmaydi?

Foydalanuvchining xavfsizligini himoya qilish maqsadida JavaScriptning brauzer dagi
imkoniyatlari cheklangan. Bundan maqsad yomon web sahifalarning maxfiy ma'lumotlarga kirishini
yoki foydalanuvchining ma'lumotlariga zarar yetkazishini oldini olishdir.

Bunday cheklovlarga misollar:

- Web sahifada JavaScript qattiq diskdagi katta hajmli fayllarni o'qishi, ularni nusxalashi 
 yoki dasturlarni ishlatishi mumkin emas. U Operatsion Tizim funksiyalariga to'g'ridan to'gri 
 kira olmaydi.

     Zamonaviy brauzerlar unga fayllar bilan birga ishlash imkonini beradi, lekin kirish cheklangan va
     va faqat agar foydalanuvchi brauzer oynasiga fayli tashlash yoki uni `<input>` tegi orqali 
     tanlash kabi ma'lum harakatlarni bajarganda ruxsat beriladi.

     Kamera/mikrofon va boshqa qurilmalar bilan bog'lanishning yo'llari mavjud, lekin ular foydalanuvchidan
     ruxsat talab qiladi. Shuning uchun JavaScript yoqilgan sahifa web-kamerani yashirincha yoqishi,
     atrofni kuzatishi va [NSA](https://en.wikipedia.org/wiki/National_Security_Agency) (Milliy Xavfsizlik Agentligi)ga ma'ulomot jo'natishi mumkin emas.
- Turli yorlig' yoki oynalar umumiy olib qaraganda bir-biri haqida hech narsa bilishmaydi. Ba'zida
esa bilishi mumkin, misol uchun bir oyna JavaScriptdan boshqa birini ochish uchun foydalansa.
Lekin xatto bu holatda ham, agar turli sayt(domen, protokol yoki port)lardan bo'lsa 
bir sahifadagi JavaScript boshqasiga kira olmaydi.

     Bu "Same Origin Policy" ("Bir xil kelib chiqish siyosati") deb nomlanadi.Buni hal qilish uchun ikkala  sahifa ham ma'lumotlar almashinuviga rozi bo'lishi va uni boshqaradigan maxsus JavaScript kodini o'z      ichiga olishi kerak. Buni qo'llanmada ko'rib chiqamiz.

     Bu cheklov ham foydalanuvchining xavfsizligi uchun. Foydalanuvchi ochgan `http://birorsayt.com` 
     sahifasi, masalan, `http://gmail.com` URL manzili bilan boshqa brauzer yorlig‘iga kira olmasligi 
     va u yerdan ma’lumotlarni o‘g‘irlamasligi kerak.
- JavaScript tarmoq orqali joriy sahifa kelgan server bilan osongina bog'lanishi mumkin. Ammo uning boshqa saytlardan/domenlardan ma'lumotlarni olish qobiliyati zaif. Mumkin bo'lsa-da, bu uzoq tomondan aniq kelishuvni (HTTP sarlavhalarida ifodalangan) talab qiladi. Yana bir bor, bu xavfsizlik chegarasidir.

![](limitations.svg)

JavaScript brauzerdan tashqarida, masalan, serverda ishlatilsa, bunday cheklovlar mavjud bo'lmaydi. Zamonaviy brauzerlar kengaytirilgan ruxsatnomalarni so'rashi mumkin bo'lgan plagin/kengaytmalarga ham ruxsat beradi.

## JavaScript nimasi bilan alohida ajralib turadi?

JavaScriptning kamida 3 ta kuchli jihatlari mavjud.

```compare
+ HTML/CSS bilan to'liq bilashuv.
+ Oson narsalar osongina bajariladi.
+ Barcha asosiy brauzerlar tomonidan qo'llab-quvvatlanadi va doimiy yoqilgan bo'ladi.
```
JavaScript bu uch narsani birlashtirgan yagona brauzer texnologiyasidir.

Shu bilan JavaScript alohida ajralib turadi. Shuning uchun u brauzer interfeyslarini yaratish uchun eng keng tarqalgan vositadir.

Shuningdek, JavaScript serverlar, mobil ilovalar va boshqalarni yaratishga ham imkon beradi.

## JavaScript "ustidan" tillar

JavaScript sintaksisi hammaning ham ehtiyojlariga mos kelavermaydi. Turli odamlar turli xil xususiyatlarni xohlashadi.

Shunday qilib, yaqinda ko'plab yangi tillar paydo bo'ldi, ular brauzerda ishga tushishidan oldin JavaScript-ga *ko'chiriladi* (aylantiriladi).

Zamonaviy vositalar ko'chirilishni juda tez va shaffof qiladi, va bu dasturchilarga boshqa tilda kodlash va uni avtomatik ravishda aylantirish imkonini beradi.

Bunday tillarga misollar:

- [CoffeeScript](http://coffeescript.org/) JavaScript uchun "sytactic sugar"(ya'ni uni oson o'qish va ifodalash xususiyatini qo'shadi). U qisqaroq sintaksisni taqdim etadi, bu bizga aniqroq kod yozish imkonini beradi. Odatda, bu Ruby dasturchilariga yoqadi.
- [TypeScript](http://www.typescriptlang.org/) murakkab tizimlarni ishlab chiqish va qo'llab-quvvatlashni soddalashtirish uchun "ma'lumotlarni qat'iy tartibda yozish" xusuiyatini qo'shishga qaratilgan. U Microsoft tomonidan ishlab chiqilgan.
- [Flow](http://flow.org/) ham ma'lumotlarni yozish xususiyatini qo'shadi, lekin boshqacha tarzda. U Facebook tomonidan ishlab chiqilgan.
- [Dart](https://www.dartlang.org/) mustaqil til boʻlib, brauzerdan tashqari muhitlarda (masalan, mobil ilovalar) ishlaydigan, lekin JavaScript-ga ham koʻchirilishi mumkin bo'lgan o'z engine ga ega. U Google tomonidan ishlab chiqilgan.
- [Brython](https://brython.info/) JavaScriptga uchun Python-transpiler bo'lib, JavaScriptni ishlatmasdan sof Pythonda ilovalar yozish imkonini beradi.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) zamonaviy, ixcham va xavfsiz dasturlash tili bo'lib, u brauzer yoki Node-ni nishonga olishi mumkin.

Yana boshqalar ham bor. Albatta, biz transpilyatsiya qilingan tillardan birini ishlatsak ham, nima qilayotganimizni tushunishimiz uchun JavaScript-ni ham bilishimiz kerak.

## Xulosa

- JavaScript dastlab faqat brauzer tili sifatida yaratilgan edi, ammo hozir u ko'plab boshqa muhitlarda ham qo'llaniladi.
- Bugungi kunda JavaScript HTML/CSS bilan toʻliq birlashgan eng keng tarqalgan brauzer tili sifatida oʻziga xos mavqega ega.
- JavaScriptga "ko'chiriladigan" va ma'lum xususiyatlarni ta'minlaydigan ko'plab tillar mavjud. JavaScript-ni o'zlashtirgandan so'ng, ularni hech bo'lmaganda qisqacha ko'rib chiqish tavsiya etiladi.
