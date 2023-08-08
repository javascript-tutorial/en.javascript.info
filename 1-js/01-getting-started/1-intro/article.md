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
1. The engine (embedded if it's a browser) reads ("parses") the script.
2. Then it converts ("compiles") the script to machine code.
3. And then the machine code runs, pretty fast.

Engine jarayonning har bir bosqichida optimallashtirishlarni amalga oshiradi. U xatto jamlangan 
skriptni ishlashi davomida kuzatadi, u orqali borayotgan ma'lumotni taxlil qiladi va shu bilimga
asoslangan mashina kodini yanada optimizatsiya qiladi.
```

## Ichki-brauzer JavaScript nimalar qila oladi?

Zamonaviy JacaScript "xavsiz" dasturlash tilidir. U xotira yoki CPU ga kam darajali kirish 
ta'minlamaydi, chunki u dastlab uni talab qilmaydigan brauzerlar uchun yaratilgandi.
Modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or the CPU, because it was initially created for browsers which do not require it.

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
    There are ways to interact with the camera/microphone and other devices, but they require a user's explicit permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other page if they come from different sites (from a different domain, protocol or port).

    This is called the "Same Origin Policy". To work around that, *both pages* must agree for data exchange and must contain special JavaScript code that handles it. We'll cover that in the tutorial.

    This limitation is, again, for the user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com`, for example, and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's a safety limitation.

![](limitations.svg)

Such limitations do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow plugins/extensions which may ask for extended permissions.

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
That said, JavaScript can be used to create servers, mobile applications, etc.

## JavaScript "ustidan" tillar

JavaScript sintaksisi hammaning ham ehtiyojlariga mos kelavermaydi. Turli odamlar turli xil xususiyatlarni xohlashadi.

Shunday qilib, yaqinda ko'plab yangi tillar paydo bo'ldi, ular brauzerda ishga tushishidan oldin JavaScript-ga *ko'chiriladi* (aylantiriladi).

Zamonaviy vositalar ko'chirilishni juda tez va shaffof qiladi, va bu dasturchilarga boshqa tilda kodlash va uni avtomatik ravishda aylantirish imkonini beradi.
So, recently a plethora of new languages appeared, which are *transpiled* (converted) to JavaScript before they run in the browser.

Bunday tillarga misollar:

- [CoffeeScript](http://coffeescript.org/) JavaScript uchun "sytactic sugar"(ya'ni uni oson o'qish va ifodalash xususiyatini qo'shadi). U qisqaroq sintaksisni taqdim etadi, bu bizga aniqroq kod yozish imkonini beradi. Odatda, bu Ruby dasturchilariga yoqadi.
- [TypeScript](http://www.typescriptlang.org/) murakkab tizimlarni ishlab chiqish va qo'llab-quvvatlashni soddalashtirish uchun "ma'lumotlarni qat'iy tartibda yozish" xusuiyatini qo'shishga qaratilgan. U Microsoft tomonidan ishlab chiqilgan.
- [Flow](http://flow.org/) ham ma'lumotlarni yozish xususiyatini qo'shadi, lekin boshqacha tarzda. U Facebook tomonidan ishlab chiqilgan.
- [Dart](https://www.dartlang.org/) mustaqil til boʻlib, brauzerdan tashqari muhitlarda (masalan, mobil ilovalar) ishlaydigan, lekin JavaScript-ga ham koʻchirilishi mumkin bo'lgan o'z engine ga ega. U Google tomonidan ishlab chiqilgan.
- [Brython](https://brython.info/) JavaScriptga uchun Python-transpiler bo'lib, JavaScriptni ishlatmasdan sof Pythonda ilovalar yozish imkonini beradi.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) zamonaviy, ixcham va xavfsiz dasturlash tili bo'lib, u brauzer yoki Node-ni nishonga olishi mumkin.

Yana boshqalar ham bor. Albatta, biz transpilyatsiya qilingan tillardan birini ishlatsak ham, nima qilayotganimizni tushunishimiz uchun JavaScript-ni ham bilishimiz kerak.

## Xulosa
- [CoffeeScript](https://coffeescript.org/) is "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](https://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](https://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.
- [Brython](https://brython.info/) is a Python transpiler to JavaScript that enables the writing of applications in pure Python without JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) is a modern, concise and safe programming language that can target the browser or Node.

There are more. Of course, even if we use one of these transpiled languages, we should also know JavaScript to really understand what we're doing.

- JavaScript dastlab faqat brauzer tili sifatida yaratilgan edi, ammo hozir u ko'plab boshqa muhitlarda ham qo'llaniladi.
- Bugungi kunda JavaScript HTML/CSS bilan toʻliq birlashgan eng keng tarqalgan brauzer tili sifatida oʻziga xos mavqega ega.
- JavaScriptga "ko'chiriladigan" va ma'lum xususiyatlarni ta'minlaydigan ko'plab tillar mavjud. JavaScript-ni o'zlashtirgandan so'ng, ularni hech bo'lmaganda qisqacha ko'rib chiqish tavsiya etiladi.
