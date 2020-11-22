import React from "react";
import { Col, Row } from "antd";

const TravelerGuide = () => {
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
      <Row style={{ justifyContent: "center", display: "flex" }}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <h1 style={{ textAlign: "center" }}>راهنمای کامل مسافر</h1>
          <p>
          هر شخصی که عضو پلتفرم بیلیگ می‌شود، می‌تواند هم <span style={{color:"#46A0AE"}}> مسافر </span>و هم <span style={{color:"#FCA468"}}> بیلیگر </span>باشد.
          </p>
          <h2>
           <span style={{color:"#46A0AE"}}> مسافر </span>کیست؟
          </h2>
          <p>
          <span style={{color:"#46A0AE"}}> مسافر </span>کسی‌ است که عضو پلتفرم بیلیگ است و در حین سفر خود خدماتی را انجام می‌دهد و در قبال آن پول دریافت می‌کند. 
          </p>
          <h2>خدماتی که یک <span style={{color:"#46A0AE"}}> مسافر </span>می‌تواند انجام دهد از این قبیل هستند:</h2>

          <li>
            جابه‌جایی بسته حین سفر:
            <p>
              خیلی افراد هستند که می‌خواهند از ایران به خارج یا بلعکس یک بسته را
              پست کنند. <span style={{color:"#46A0AE"}}> مسافر </span>می‌تواند این بسته را از صاحب آن تحویل بگیرد و آن
              را در مقصد به شخص ازپیش‌تعیین‌شده تحویل دهد. مثلاً مدارک، کتاب،
              موبایل، لپ‌تاپ، دارو و هرچیز دیگه‌ای که همراه داشتن آن در پرواز و
              عبور آن از گمرک مطابق با قوانین است.
            </p>
          </li>
          <li>
            خرید از خارج یا داخل کشور:
            <p>
              ممکن است یک نفر در ایران باشد و بخواهد از خارج کالا بخرد. مسافری
              که از خارج به ایران سفر دارد، می‌تواند این کتاب را بخرد و با خود
              به ایران بیاورد. یا بلعکس، ممکن است یک نفر در خارج باشد و بخواهد
              از ایران کالایی خریداری کند، مسافری که از ایران به خارج می‌رود
              می‌تواند این کالا را تهیه کند و با خود به کشور مقصد ببرد. توجه
              کنید که هزینه خرید + دستمزد <span style={{color:"#46A0AE"}}> مسافر </span>از قبل به پلتفرم بیلیگ پرداخت
              می‌شود و تا پایان فرایند خرید و تحویل کالا نزد بیلیگ به‌عنوان
              ضمانت باقی می‌ماند. پس از تحویل در اسرع وقت مبلغ به <span style={{color:"#46A0AE"}}> مسافر </span>پرداخت
              می‌شود. بنابراین در صورتی که <span style={{color:"#46A0AE"}}> مسافر </span>درخواست خریدی را قبول می‌کند
              باید ابتدا با هزینه شخصی خودش آن خرید را انجام دهد و بعد از تحویل
              هزینه خرید + دستمزد خود را از بیلیگ بگیرد.
            </p>
          </li>
          <h2>مراحلی که <span style={{color:"#46A0AE"}}> مسافر </span>باید طی کند</h2>
          <ol>
            <li>ثبت نام در سایت و ثبت سفر:</li>
            <p>
              اولین کار اینه که در سایت ثبت نام کنید. بعد از ثبت نام شما یک عضو
              از بیلیگ هستید. شما زمانی <span style={{color:"#46A0AE"}}> مسافر </span>هستید که می‌خواهید به سفر بروید و
              می‌‌تونید به بیلیگرها (آگهی‌دهنده) خدماتی که در بالا ذکر شد ارائه
              بدید. بنابراین شما به‌عنوان <span style={{color:"#46A0AE"}}> مسافر </span>باید اطلاعات سفر خودتون رو ثبت
              کنید. برای ثبت سفر خودتون بعد از ثبت نام وارد پروفایل بشید و در
              قسمت «سفرهای من» روی «ثبت سفر» کلیک کنید. یک فرم برای شما باز میشه
              که اطلاعات سفرتون شامل مبدأ و مقصد سفر و تاریخ پرواز رو ثبت کنید.
            </p>
            <li>ثبت پیشنهاد روی آگهی‌ها:</li>
            <p>
              بعد از اینکه سفرتون ثبت شد حالا می‌تونید به لیست آگهی‌ها برید و
              اونجا با استفاده از فیلتری که وجود داره آگهی‌هایی که مطابق با مبدأ
              و مقصد سفرتون هست رو به‌راحتی پیدا کنید و ببینید. همون طور که گفته
              شد این آگهی‌ها می‌تونند درخواست حمل یا خرید و حمل باشند. شما
              می‌تونید درخواستی که براتون مقدور و مناسب هست رو انتخاب کنید و روش
              یه پیشنهاد بذارید. برای اینکه کارتون راحت‌تر بشه، می‌تونید بعد از
              ثبت سفر روی گزینه «ارسال پیشنهاد به همه آگهی‌های مطابق با سفر»
              کلیک کنید تا به‌صورت اتوماتیک به تمام آگهی‌هایی که با مبدأ و مقصد
              سفر شما مطابقت دارند پیشنهاد ارسال بشه.
            </p>
            <li>مذاکره و توفق نهایی با بیلیگر:</li>
            <p>
              <span style={{color:"#FCA468"}}> بیلیگر </span>از این پیشنهاد شما مطلع میشه و می‌تونه پیشنهاد شما رو رد و
              یا قبول کنه. در صورتی که پیشنهادتون رو قبول کنه وارد فاز مذاکره با
              <span style={{color:"#FCA468"}}> بیلیگر </span>می‌شوید. شما می‌تونید سر قیمت،زمان تحویل، محل قرار و ... با
              هم مذاکره کنید و به توافق برسید. بهتر است مذاکره رو از طریق صندوق
              پیام در پروفایلتون انجام بدید تا صحبت‌ها و توافقات شما در سایت ثبت
              بشه تا در صورت اختلاف بتوان به پیام‌ها مراجعه کرد و اختلاف را
              حل‌وفصل نمود.
            </p>
            <li>نهایی کردن دستمزد توافق شده:</li>
            <p>
              بعد از مذاکره و رسیدن به توافق شما (مسافر) باید به قسمت «سفرهای
              من» در پروفایلتون برید و روی «پیشنهادها» در سفر مربوطه کلیک کنید و
              قیمتی رو که <span style={{color:"#FCA468"}}> بیلیگر </span>بعد از مذاکره به‌عنوان قیمت نهایی ثبت کرده،
              تأیید کنید. بعد از تأیید شما، <span style={{color:"#FCA468"}}> بیلیگر </span>باید این هزینه رو به پلتفرم
              بیلیگ پرداخت کنه. بعد از پرداخت شما می‌تونید کارتون رو با خیال
              راحت انجام بدید. مثلاً اگر <span style={{color:"#FCA468"}}> بیلیگر </span>از شما خواسته که براش از مبدأ
              سفرتون یک کتاب بخرید، ابتدا باید پول کتاب + دستمزد شما (مسافر) رو
              به بیلیگ پرداخت کنه تا خیال شما از این بابت راحت بشه. یا اگر قرار
              نیست شما خریدی انجام بدید و فقط قراره که یک بسته رو تحویل بگیرید و
              با خودتون حمل کنید، <span style={{color:"#FCA468"}}> بیلیگر </span>باید دستمزد شما رو به بیلیگ پرداخت کنه
              و بعد شما شروع به انجام کارتون بکنید.
            </p>
            <li>انجام خدمت:</li>
            <p>
              بعد از توافق با <span style={{color:"#FCA468"}}> بیلیگر </span>در مذاکره و تأیید پرداخت دستمزدتان، حالا
              باید خدمتی که به شما محول شده رو انجام بدید. مثلاً شما سفرتون از
              کانادا به ایرانه و <span style={{color:"#FCA468"}}> بیلیگر </span>از شما خواسته که براش از کانادا یه کتاب
              بخرید و به ایران بیارید. و یا مثلاً از شما خواسته که مدارکش رو از
              دانشگاه تحویل بگیرید و به ایران بیارید و ... .
            </p>
            <li>تحویل و دریافت دستمزد:</li>
            <p>
              بعد از این که شما این خدمت رو انجام دادید، باید به <span style={{color:"#FCA468"}}> بیلیگر </span>بگید که
              به پروفایلش بره و روی «تأیید دریافت» کلیک کنه. بعد از تأیید بیلیگر
              دستمزد شما نهایتاً تا ۳ روز بعد (اگر مورد خرید بوده و شما خودتون
              خرید انجام دادید، به‌علاوه هزینه خرید اون جنس) به حساب شما (مسافر)
              واریز میشه.
            </p>
          </ol>
          <p><b>
            در صورتی که ابهامی برای شما به وجود آمده و یا سؤالی دارید می‌تونید
            از طریق پشتیبانی بیلیگ خیلی سریع به جواب برسید.
            </b></p>
        </Col>
      </Row>
    </div>
  );
};

export default TravelerGuide;
