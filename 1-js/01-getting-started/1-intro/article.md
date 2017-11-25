# Giới thiệu về JavaScript

Hãy cùng tìm hiểu xem có điều gì đặc biệt về JavaScript, chúng ta có thể đạt được gì và những công nghệ nào có thể tương thích tốt với nó.

## JavaScript là gì?

*JavaScript* đã được tạo ra ban đầu để *"để tạo các trang web động"*.

Các chương trình trong ngôn ngữ này được gọi là *scripts*. Chúng có thể được viết ngay bên trong HTML và thực thi tự động ngay khi trang web bắt đầu tải lên.

Scripts được cung cấp và thực thi dưới dạng văn bản. Chúng không cần một sự chuẩn bị hay một trình biên dịch đặc biệt nào để chạy.

Về khía cạnh này, JavaScript rất khác so với ngôn ngữ [Java](http://en.wikipedia.org/wiki/Java).

```smart header="Tại sao <u>Java</u>Script?"
Khi Javascript được tạo ra ban đầu, nó có một cái tên khác: "LiveScript". Những Java là một ngôn ngữ rất phổ biến ở thời điểm đó, so it was decided that positioning a new language as a "younger brother" of Java would help.

Nhưng khi nó phát triển, JavaScript đã trở thành một ngôn ngữ hoàn toàn độc lập, with its own specification called [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), và bây giờ nó hoàn toàn không có một liên hệ gì với Java.
```
Ở thời điểm hiện tại, Javascript không những có thể thực thi trên trình duyệt, mà còn trên server, hay thực sự là trên bất kỳ thiết bị nào mà ở đó tồn tại một chương trình đặc biệt gọi là [the JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine).

Trình duyệt có một engine nhúng, thỉnh thoảng nó được gọi là một "JavaScript virtual machine".

Các engine khác nhau sẽ có các "codenames" khác nhau, ví dụ:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- Chrome và Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- Firefox.
- ...Có những codenames khác như "Trident", "Chakra" cho các phiên bản khác nhau của IE, "ChakraCore" cho Microsoft Edge, "Nitro" và "SquirrelFish" cho Safari,...

Những khái niệm ở trên nên nhớ, bởi vì chúng được sử dụng trong các bài báo lập trình trên internet. Chúng ta cũng sử dụng chúng nữa. Chẳng hạn, nếu "một chức năng X được hỗ trợ bởi V8", nhiều khả năng nó cũng sẽ hoạt động trên Chrome và Opera.

```smart header="Engines hoạt động như thế nào?"

Engines thì phức tạp. Nhưng những yếu tố cơ bản thì dễ dàng.

1. Engine (được nhúng nếu như đó là một trình duyệt) đọc ("phân tích cú pháp") của script.
2. Sau đó nó chuyển đổi ("biên dịch") script thành ngôn ngữ máy.
3. Và sau đó mã máy chạy, khá nhanh.

Engine thực hiện việc tối ưu trên từng giai đoạn của tiến trình. Nó thậm chí theo dõi script đã được biên dịch khi nó chạy, phân tích dữ liệu đi qua nó và thực hiện việc tối ưu dựa trên kiến thức đó. Do đó, script chạy rất nhanh.
```

## JavaScript có thể làm gì trên trình duyệt?

Javascript hiện đại là một ngôn ngữ "an toàn". Nó không cung cấp khả năng truy cập cấp thấp đển bộ nhớ hay CPU, bởi vì ban đầu nó được tạo ra cho các trình duyệt, nên không đòi hỏi những điều đó.

Khả năng ứng dụng rất nhiều phụ thuộc vào môi trường chạy JavaScript. Chẳng hạn, [Node.JS](https://wikipedia.org/wiki/Node.js) hỗ trợ các hàm cho phép JavaScript đọc/ghi các tập tin tuỳ ý, thực hiện các kết nối mạng,...

Trong trình duyệt, JavaScript có thể làm mọi thứ liên quan đến tuỳ chỉnh trang web, giao tiếp với người dùng và máy chủ web.

Chẳng hạn, trong trình duyệt JavaScript có khả năng:

- Thêm nội dung HTML cho một trang, thay đổi nội dung hiện tại, điều chỉnh styles.
- Phản ứng lại hành động của người dùng, click chuột, di chuyển con trẻ, nhấn phím.
- Gửi các yêu cầu qua mạng tới các máy chủ từ xa, tải về và tải lên các tập tin (còn được gọi là công nghệ [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) và [COMET](https://en.wikipedia.org/wiki/Comet_(programming))).
- Đọc và ghi cookies, hỏi câu hỏi người truy cập, hiển thị các tin nhắn.
- Nhớ dữ liệu ở client-side ("local storage").

## JavaScript không thể làm gì trên trình duyệt?

Khả năng của Javascript bị hạn chế nhằm mang lại lợi ích cho sự an toàn của người dùng. Một tiêu là để ngăn cản một trang web xấu truy cập thông tin cá nhân hoặc làm tổn hại dữ liệu của người dùng.

Ví dụ cho những sự ngăn cắm như thế là:

- JavaScript trên một trang web không thể đọc/ghi các tập tin tuỳ ý trên ổ cứng, sao chép chúng hoặc thực thi các chương trình. Nó không có quyền truy cập trực tiếp đến các chức năng hệ điều hành.

    Các trình duyệt hiện có cho phép nó làm việc với các tập tin, nhưng việc truy cập bị giới hạn và chỉ được cung cấp nếu người sử dụng thực hiện một số thao tác, như "thả" một tập tin vô cửa sổ trình duyệt hoặc là chọn nó thông qua thẻ `<input>`.

    Có nhiều các để giao tiếp với camera/microphone và các thiết bị khác, nhưng chúng đòi hỏi một sự cho phép rõ ràng từ người dùng. Nên một trang web đã được kích hoạt Javascript không thể lén lút kích hoạt web-camera, quan sát xung quanh và gửi thông tin đến [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Các tab/cửa sổ khác nhau nói chung là không biết về nhau. Thỉnh thoảng chúng có thể, ví dụ khi một cửa sổ sử dụng JavaScript để mở một cửa sổ khác. Nhưng thậm chí trong trường hợp đó, JavaScript từ một trang không thể truy xuất đến trang khác nếu như chúng đến từ các site khác nhau (từ tên miền, giao thức hoặc cổng khác).

    Nó được gọi là "Same Origin Policy". Để vượt qua điều đó, *cả hai trang* phải chứa một mã JavaScript đặc biệt để xử lý việc trao đổi dữ liệu.

    Giới hạn một lần nữa là nhằm đảm bảo an toàn của người dùng. Một trang từ `http://anysite.com` mà người dùng đang mở cần phải không được phép truy cập đến một trình duyệt cửa sổ khác với đường dẫn `http://gmail.com` và đánh cắp thông tin từ đó.
- JavaScript có thể dễ dàng giao tiếp thông qua mạng đến máy chủ của trang hiện tại. Nhưng khả năng nhận dữ liệu từ các trang/tên miền khác thì bị vô hiệu hoá. Mặc dù có thể, nó yêu cẩu một sự đống ý rõ ràng (thể hiện trong HTTP headers) từ xa. Một lần nữa, đó là những hạn chế về an toàn.

![](limitations.png)

Các giới hạn đó không tồn tại nếu JavaScript được sử dụng bên ngoài trình duyệt, ví dụ trên máy chủ. Các trình duyệt hiện đại cũng cho phép cài đặt plugin / tiện ích mở rộng để có thể nhận được các quyền mở rộng.

## Điều gì làm cho Javascript độc đáo?

Có ít nhất "ba" điều tuyệt vời về JavaScript:

```compare
+ Tích hợp đầy đủ với HTML / CSS.
+ Những việc đơn giản được thực hiện một cách đơn giản.
+ Được hỗ trợ bởi tất cả các trình duyệt chính và được bật theo mặc định.
```

Kết hợp, ba điều này chỉ tồn tại trong JavaScript và không có công nghệ trình duyệt nào khác.

Đó là những gì làm nên sự độc đáo của JavaScript. Đó là lý do tại sao nó là công cụ phổ biến nhất để tạo các giao diện trên trình duyệt.

Trong khi lên kế hoạch học một công nghệ mới, sẽ rất hữu ích khi kiểm tra các quan điểm của nó. Vì vậy, hãy chuyển sang các xu hướng hiện đại bao gồm các ngôn ngữ mới và các khả năng trình duyệt.


## Ngôn ngữ "trên" JavaScript

Cú pháp của JavaScript không phù hợp với nhu cầu của mọi người. Những người khác nhau muốn có những tính năng khác nhau.

Điều đó được mong đợi, bởi vì các dự án và yêu cầu khác nhau cho mọi người.

Gần đây có rất nhiều ngôn ngữ mới xuất hiện, được *chuyển đổi* (biến đổi) sang JavaScript trước khi chúng chạy trong trình duyệt.

Các công cụ hiện đại làm cho quá trình chuyển đổi rất nhanh và minh bạch, thực sự cho phép các nhà phát triển mã bằng một ngôn ngữ khác và tự động chuyển đổi nó bên dưới.

Ví dụ về các ngôn ngữ như vậy:

- [CoffeeScript](http://coffeescript.org/) là một "cú pháp tinh giản" cho JavaScript, nó giới thiệu cú pháp ngắn hơn, cho phép viết code chính xác hơn và rõ ràng. Thông thường lập trình viên Ruby thích nó.
- [TypeScript](http://www.typescriptlang.org/) tập trung vào việc thêm "kiểu dữ liệu chặt chẽ", để đơn giản hóa sự phát triển và hỗ trợ của các hệ thống phức tạp. Nó được phát triển bởi Microsoft.
- [Dart](https://www.dartlang.org/) là một ngôn ngữ độc lập có engine riêng chạy ở môi trường không phải trình duyệt (như ứng dụng dành cho thiết bị di động). Ban đầu nó được cung cấp bởi Google như là một sự thay thế cho JavaScript, nhưng hiện tại, các trình duyệt yêu cầu nó được chuyển đổi sang JavaScript cũng giống như những ngôn ngữ ở trên.

Còn nhiều nữa. Tất nhiên ngay cả khi chúng ta sử dụng một trong những ngôn ngữ đó, chúng ta cũng nên biết JavaScript, để thực sự hiểu những gì chúng ta đang làm.

## Tóm tắt

- JavaScript ban đầu được tạo ra như là một ngôn ngữ chỉ dành cho trình duyệt, nhưng bây giờ nó được sử dụng trong nhiều môi trường khác nữa.
- Tại thời điểm này, JavaScript có một vị trí duy nhất là ngôn ngữ trình duyệt được sử dụng rộng rãi nhất và tích hợp đầy đủ với HTML / CSS.
- Có nhiều ngôn ngữ được chuyển đổi sang JavaScript và cung cấp một số tính năng nhất định. Chúng tôi khuyên bạn nên xem xét chúng, ít nhất một thời gian ngắn, sau khi làm chủ JavaScript.
