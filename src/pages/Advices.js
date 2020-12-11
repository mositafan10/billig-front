import React from "react";
import { Col, Row } from "antd";
import Advise from '../media/Advise.svg';

const Advices = () => {
  window.scroll(0, 0);
  return (
    <div
      style={{
        direction: "rtl",
        padding: "30px",
        fontSize: "16px",
        textAlign: "justify",
      }}
    >
        <Row style={{display:"flex",justifyContent:"center"}}>
          <img src={Advise} alt="billligAdvices" width={400} />
          </Row>
      <Row style={{ justifyContent: "center", display: "flex" }}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <h1 style={{ textAlign: "center" }}>
            توصیه‌های مهم در استفاده از بیلیگ
          </h1>
          <p>
            برای فعالیت در پلتفرم بیلیگ باید کاربران نکاتی را رعایت کنند تا حتی
            المقدور از بروز هرگونه مشکل در آینده جلوگیری کنیم. کاربران بیلیگ
            باید بدانند پلتفرم بیلیگ بر پایه اعتماد بنا شده است. بنابراین در
            تمام فعالیت ها و معاملات در پلتفرم بیلیگ باید به این اصل اساسی توجه
            ویژه داشته باشید و از هیچ تلاشی در جهت کمک به افراد و افزایش حس
            اعتماد آن‌ها دریغ نکنید. همان طور که می‌دانید ساز و کار پلتفرم بیلیگ
            به این صورت است که افراد، آگهی خرید کالا و یا جا‌به‌جایی بسته خود را
            در سایت قرار می‌دهند و سپس مسافران بر روی آگهی‌های آن‌ها پیشنهاد
            می‌گذارند. در صورتی که شما پیشنهادی می‌دهید ویا پیشنهادی را قبول
            کنید وارد مرحله مذاکره با مسافر می‌شوید. در این مرحله نکات مهمی وجود
            دارد که باید از سوی مسافر و خریدار/صاحب بسته رعایت شود.
          </p>
          <li>
            از محیط چت بیلیگ استفاده کنید:
            <p>
              سعی کنید مذاکرات خود را از طریق محیط چت بیلیگ انجام دهید. حسن این
              کار در این است که اگر بعداً سر موضوعی اختلاف پیش بیاید، تمام
              مذاکرات در محیط چت بیلیگ ذخیره شده‌اند و رسیدگی به اختلاف آسوده‌تر
              انجام خواهد گرفت.
            </p>
          </li>
          <li>
            در مکان‌های عمومی قرار بگذارید:
            <p>
              یک نکته مهم در تحویل گرفتن و تحویل دادن بسته‌ها مکان قرار گذاشتن
              است. مسلماً اگر این قرار در یک مکان عمومی باشد امکان از امینت
              بالاتری برخوردار است.
            </p>
          </li>
          <li>
            از سیستم امتیازدهی سایت استفاده کنید:
            <p>
              سیستم ریتینگ سایت برای بالا بردن اعتمادپذیری کاربران به یکدیگر
              ایجاد شده است بنابراین توصیه می‌شود حتما از این سیستم استفاده کنید
              تا کاربران دیگر از تجربیات شما در مواجهه با کاربران دیگر مطلع
              شوند.
            </p>
          </li>
          <li>
            بسته را کاملا بررسی کنید:
            <p>
              مسافران حق این را دارند که بسته‌هایی که تحویل می‌گیرند را کاملاً
              بررسی کنند و داخل آن را ببینند. این کار باعث اطمینان خاطر مسافر
              می‌شود و صاحبان بسته نیز نباید از این کار ممانعت کنند. در ضمن
              توصیه می‌شود بسته‌هایی که امکان بررسی دقیق آن‌ها ‌وجود ندارد را جا
              به جا نکنید.
            </p>
          </li>
          <li>
            پرواز را چک کنید:
            <p>
              حتما از طریق سایت ایرلاین و فرودگاه‌ها صحت ساعت و روز پرواز ادعا
              شده توسط مسافر را بررسی نمایید.
            </p>
          </li>
          <li>
            حتما رسید و فاکتور بگیرید:
            <p>
              اگر قرار است کالایی را خریداری کنید حتما رسید و فاکتور خرید را از
              فروشنده بگیرید و هنگام تحویل کالا به مشتری تحویل دهید. همچنین
              داشتن رسید، برای ارائه در فرودگاه و گمرک جهت اظهار قیمت ضروری
              می‌باشد.
            </p>
          </li>
          <li>
            از رد و بدل کردن پول و پرداخت شخصی بپرهیزید:
            <p>
              سیستم پرداخت امن بیلیگ برای اعتمادسازی بیشتر و جلوگیری از
              کلاه‌برداری و سوءاستفاده‌های مالی طراحی شده است و عدم استفاده از
              آن به معنی نقض قوانین بیلیگ می‌باشد.
            </p>
          </li>
          <li>
            بیعانه ندهید:
            <p>
              هرگز پیش از دریافت کالا، هزینه‌ای تحت عنوان بیعانه، شیرینی، رزرو
              و... پرداخت نکنید. در صورتی که مسافر از شما درخواست بیعانه کرد،
              لطفاً مورد را به تیم پشتیبانی بیلیگ اطلاع دهید.
            </p>
          </li>
          <h3 >
            زنگ خطرها در توافق: زمانی که باید بیشتر احتیاط کنید
          </h3>
          <ul>
          <li>قیمت دستمزد و شرایط ارائه شده بیش از حد عالی به نظر می رسد.</li>
          <li>
            مسافر قبل از تحویل کالا به هر عنوانی درخواست بیعانه داشته باشد.
          </li>
          <li>آگهی‌دهنده اطلاعات شفاف و کاملی دربارهٔ کالا ارائه نمی‌کند.</li>
          <li>طرف مقابل بدون دلیل منطقی درخواست تحویل حضوری را رد کند.</li>
          <li>
            طرف مقابل بدون دلیل منطقی اطلاعات شخصی یا حساب بانکی شما را می‌پرسد.
          </li>
          <li>
            سفارش دهنده خود را از نماینده معتبر و تأیید شده توسط سایت بیلیگ
            معرفی می‌کند.
          </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default Advices;
