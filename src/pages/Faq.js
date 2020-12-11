import React from "react";
import { Tabs, Collapse, Row, Col, Divider } from "antd";
const { TabPane } = Tabs;
const { Panel } = Collapse;

const text_style = { fontSize: "16px", textAlign: "justify" };
const header_style = { fontSize: "18px", textAlign: "right" };

const Faq = () => {
  window.scroll(0, 0);
  return (
    <div>
      <Row style={{ justifyContent: "center", display: "flex" }}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Tabs
            defaultActiveKey="1"
            type="card"
            style={{ textAlign: "center", fontSize: "25px" }}
            centered
          >
            <TabPane tab="مسافر" key="1">
              <Collapse accordion>
                <Panel header="بیلیگ چیست؟" style={header_style} key="1">
                  <p style={text_style}>
                    بیلیگ پلتفرمی است که صاحبان بسته و مشتریان کالا را به
                    مسافران متصل می‌کند. اگر شما مسافرید و در چمدانتان جال خالی
                    دارید می‌توانید به راحتی یک آگهی هم‌مقصد با خودتان را بیابید
                    و درآمد کسب کنید و هزینه‌های سفرتان را کاهش دهید.
                  </p>
                </Panel>
                <Panel header="چرا بیلیگ؟" style={header_style} key="2">
                  <p style={text_style}>
                    بیلیگ یک پلتفرم خرید و پست سریع در ایران است که با ایجاد یک
                    شبکه امن از افراد مطمئن بستری را فراهم آورده است تا ایرانیان
                    سراسر جهان بتوانند بر پایه آن نیازهای خود را برطرف سازند و
                    درآمد داشته باشند.
                  </p>
                </Panel>
                <Panel
                  header="آیا بیلیگ مطمئن است؟"
                  style={header_style}
                  key="3"
                >
                  <p style={text_style}>
                    هنگام ثبت نام در بیلیگ، کاربران از طریق شماره تماس احراز
                    هویت می‌شوند. همچنین سیستم امتیازدهی سایت باعث می‌شود که شما
                    بتوانید افراد را اعتبارسنجی کنید. سیستم پرداخت امن بیلیگ هم
                    امکان هرگونه اختلافات و سوء‌استفاده‌های مالی را به نزدیک صفر
                    می‌رساند. اما از آنجا که بیلیگ یک پلتفرم واسطه‌ای می‌باشد،
                    رعایت احتیاط و توصیه‌های امنیتی شرط لازم است زیرا هیچ سیستم
                    مشابهی نیز در جهان 100 درصد مطمئن نیست. برای جلوگیری از
                    هرگونه مشکل احتمالی بیلیگ اقدام به جمع‌آوری قوانین گمرکی
                    کشورهای مختلف کرده است و همچنین در قسمت توصیه ها و قوانین
                    سایت می‌توانید مطالب بسیار مهمی پیدا کنید که به شما کمک
                    می‌کند از اشتباهات احتمالی که منجر به مشکلات می‌شوند جلوگیری
                    کنید.
                  </p>
                </Panel>
                <Panel
                  header="چگونه می‌توانم بسته‌ای را قبول و حمل کنم؟"
                  style={header_style}
                  key="4"
                >
                  <p style={text_style}>
                    در سایت می‌توانید تمام آگهی‌های موجود را مشاهده کنید و با
                    استفاده از فیلترهای جستجو، بسته‌های مرتبط با مبدأ و مقصد خود
                    را پیدا کنید. سپس شما می‌توانید روی آگهی مورد نظرتان
                    پیشنهادی را ثبت کنید و قیمتی را بابت جابه‌جایی یا خرید کالا
                    تعیین کنید. اگر این پیشنهاد از طرف صاحب بسته/ خریدار تأیید
                    شود، باید در ادامه با کاربر مذاکره کنید و به توافق برسید.
                    سپس در صورت توافق، خریدار/صاحب بسته هزینه را از طریق سیستم
                    پرداخت امن بیلیگ به حساب بیلیگ واریز می‌نماید. از این لحظه
                    به بعد شما می‌بایست بسته را تحویل گرفته و یا طی ۷ روز سفارش
                    را با هزینه شخصی خودتان خریداری کنید (در صورتی که سفارش خرید
                    باشد). ۱ روز پس از تحویل موفق بسته، مبلغ کالا به‌علاوه
                    دست‌مزدتان که از قبل با خریدار/ صاحب بسته توافق کرده بودید
                    به حسابتان واریز می‌شود.
                  </p>
                </Panel>
                <Panel
                  header="چقدر می‌توانم درآمد کسب کنم؟"
                  style={header_style}
                  key="5"
                >
                  <p style={text_style}>
                    یکی از بهترین راه‌ها برای کسب درآمد از سفر و کم کردن
                    هزینه‌های سفر استفاده از بیلیگ است. شما می‌توانید از
                    طریق بیلیگ هم سفر کنید و هم درآمد داشته باشید. این درآمد
                    بستگی به این دارد که شما چه تعداد سفارش قبول می‌کنید و چه
                    دستمزدی را با صاحب بیلیگر (صاحب آگهی) توافق می‌کنید. گاهی اوقات
                    صاحبان بسته حاضراند برای یک برگ کاغذ مبلغ زیادی هزینه کنند
                    اما سریعا این کاغذ به دستشان برسد! بنابراین این موضوع متغیر
                    است و نمی‌توان مبلغ ثابتی را برای آن در نظر گرفت
                  </p>
                </Panel>
                <Panel
                  header="آیا مالیات و عوارضی باید پرداخت کنم؟"
                  style={header_style}
                  key="6"
                >
                  <p style={text_style}>
                    خیر، مالیات و عوارض فقط در صورتی که سفارش خرید گرفته باشید
                    باید موقع خرید بپردازید که مبلغ آن را خریدار تقبل خواهد
                    نمود.
                  </p>
                </Panel>
                <Panel
                  header="آیا باید به بیلیگ کمیسیون بپردازم؟"
                  style={header_style}
                  key="7"
                >
                  <p style={text_style}>
                    خیر، بیلیگ از مسافران کمیسیون دریافت نمی‌کند و کمیسیون
                    دریافتی از آگهی دهنده کسر می‌شود.
                  </p>
                </Panel>
                <Panel
                  header="اگر خریدار بسته را قبول نکرد چه کنم؟"
                  style={header_style}
                  key="8"
                >
                  <p style={text_style}>
                    توصیه می‌شود قبل و حین انجام خرید با آگهی دهنده چک بفرمایید
                    تا دقیقاً کالای مورد سفارش را تهیه نمایید اما در صورتی که
                    خریدار کالایی را که سفارش داده است و شما تهیه کرده‌اید به هر
                    دلیل قبول نکند باید سریعاً این موضوع را به پشتیبانی بیلیگ
                    اطلاع دهید تا همکاران ما در قسمت پشتیبانی پیگیری نمایند.
                  </p>
                </Panel>
                <Panel
                  header="اگر خریدار سفارش را لغو کند چه می‌شود؟"
                  style={header_style}
                  key="9"
                >
                  <p style={text_style}>
                    امکان لغو سفارش پس از خرید وجود ندارد و در صورتی که خریدار
                    کالا را به هر دلیلی تحویل نگیرد، بیلیگ کالا را از شما تحویل
                    گرفته و پول را برای شما واریز خواهد کرد.
                  </p>
                </Panel>
                <Panel
                  header="چه مدت وقت دارم تا سفارش را خریداری کنم؟"
                  style={header_style}
                  key="10"
                >
                  <p style={text_style}>
                    ۷ روز بعد از انجام پرداخت توسط خریدار باید کالا توسط شما
                    خریداری شود. در غیر این صورت سفارش شما لغو می‌شود و این آگهی
                    دوباره در لیست آگهی‌های سایت قرار می‌گیرد و مسافران دیگر نیز
                    می‌توانند پیشنهاد بدهند.
                  </p>
                </Panel>
                <Panel
                  header="آیا باید بلیط پرواز یا مدارک شناسایی خود را به خریدار نشان دهم؟"
                  style={header_style}
                  key="11"
                >
                  <p style={text_style}>
                    برای هماهنگی هنگام مذاکره بهتر است بلیط پرواز و حتی مدارک
                    شناسایی‌تان را برای جلب اعتماد به خریدار/ صاحب بسته نشان
                    دهید. این کار باعث می‌شود طرف مقابل به حسن نیت شما مطلع شود
                    و راحت‌تر به شما اطمینان کند ولی هیچ اجباری وجود ندارد.
                  </p>
                </Panel>
                <Panel
                  header="آیا می‌توانم بسته را خودم بازرسی کنم و داخل آن را ببینم؟"
                  style={header_style}
                  key="12"
                >
                  <p style={text_style}>
                    حتماً، توصیه اکید ما این است که بسته‌هایی که از صاحبان بسته
                    دریافت می‌کنید را با هماهنگی صاحب آن، دقیق بررسی کنید.
                  </p>
                </Panel>
                <Panel
                  header="اگر ماموران فرودگاه از من درباره حمل بار دیگران بپرسند چه باید بگویم؟"
                  style={header_style}
                  key="13"
                >
                  <p style={text_style}>
                    این کار در تمام دنیا انجام می‌شود و شما می‌توانید به راحتی
                    بگویید که برای دوستتان خریدی انجام داده‌اید.
                  </p>
                </Panel>
                <Panel
                  header="آیا باید با پول شخصی کالا را خریداری کنم؟"
                  style={header_style}
                  key="14"
                >
                  <p style={text_style}>
                    بله، کالا را باید با پول شخصی خریداری کنید. اما خیالتان راحت
                    باشد زیرا مشتری پول را پرداخته کرده و پول شما در جیب بیلیگ
                    امانت است تا زمانی که بسته را تحویل دهید.
                  </p>
                </Panel>
                <Panel
                  header="چه موقع پول من توسط بیلیگ بازگردانده می‌شود؟"
                  style={header_style}
                  key="15"
                >
                  <p style={text_style}>
                    حداکثر ۳ روز بعد از تحویل موفق، مبلغ کالا ( طبق فاکتور ) به
                    علاوه دست‌مزدتان که از قبل توافق کرده بودید، به حساب شما
                    واریز می‌شود.
                  </p>
                </Panel>
                <Panel
                  header="پرداخت ها در بیلیگ چگونه انجام می‌شوند؟"
                  style={header_style}
                  key="16"
                >
                  <p style={text_style}>
                    پرداخت ها از طریق درگاه پرداخت اینترنت سایت بیلیگ انجام
                    می‌شود و همه تراکنش‌ها به تومان می‌باشد.
                  </p>
                </Panel>
                <Panel
                  header="مبلغ دست‌مزد توسط خودم تعیین می‌شود یا توسط بیلیگ ؟"
                  style={header_style}
                  key="17"
                >
                  <p style={text_style}>
                    دست‌مزد را شما به خریدار/ صاحب بسته پیشنهاد می‌دهید و خودتان
                    به توافق می‌رسید. بیلیگ دخالتی در تعیین دست‌مزدها ندارد.
                  </p>
                </Panel>
                <Panel
                  header="چه کالاهایی را می‌توانم بخرم یا حمل کنم؟"
                  style={header_style}
                  key="18"
                >
                  <p style={text_style}>
                    مسلماً کالاهایی را باید بخرید که بتوانید با خود از کشور مبدأ
                    به کشور مقصد حمل کنید و از نظر قوانین گمرکی کشور مبدأ و مقصد
                    منعی وجود نداشته باشد. قوانین و مقررات گمرکی کشورهای جهان را
                    می‌توانید در سایت بیلیگ بخوانید.
                  </p>
                </Panel>
                <Panel
                  header="آیا می‌توانم سفارشی که قبول کرده‌ام را هر لحظه لغو کنم؟"
                  style={header_style}
                  key="19"
                >
                  <p style={text_style}>
                    بله، هر لحظه می‌توانید سفارش را لغو کنید. در صورتی که برنامه
                    سفرتان تغییر کرده است، می‌توانید سفارش را لغو کنید. اگر بعد
                    از انجام خرید سفارش از سمت شما لغو شود، کالای خریداری شده
                    متعلق به شما می‌شود و مبلغ بلوکه شده نزد بیلیگ به خریدار
                    بازگردانده می‌شود. در صورتی که بسته‌ای را از صاحب بسته
                    دریافت کرده‌اید و برنامه سفرتان تغییر کرده است باید سریعاً
                    صاحب بسته را از این موضوع مطلع سازید و بسته را با هزینه
                    خودتان به دست صاحب بسته برسانید تا او بتواند هرچه زودتر
                    مسافر دیگری پیدا کند. شبکه بیلیگ بر اساس حس هم‌نوع‌دوستی و
                    اعتماد متقابل تشکیل شده است.
                  </p>
                </Panel>
                <Panel
                  header="از چه فروشگاه‌هایی می‌توانم خرید کنم؟"
                  style={header_style}
                  key="20"
                >
                  <p style={text_style}>
                    شما باید قبل از خرید، قیمت و نوع محصول را مشخصاً با خریدار
                    توافق کرده باشید و طبق آن می‌توانید از هر فروشگاهی خرید را
                    انجام دهید. اما پیشنهاد بیلیگ این است که تمام خریدها به صورت
                    آنلاین و از سایت‌های معتبر جهانی انجام شوند تا هیچ‌گونه شک و
                    شبهه‌ای در اصالت کالا و قیمت آن نباشد. در صورتی که مبلغ خرید
                    یا نوع کالا با چیزی که از قبل توافق شده است مغایر باشد ضرر و
                    زیان آن به عهده شما می‌باشد.
                  </p>
                </Panel>
                <Panel
                  header="آیا باید کالا را حتما آنلاین خریداری کنم؟"
                  style={header_style}
                  key="21"
                >
                  <p style={text_style}>
                    خیر، شما می‌توانید طبق توافقی که با خریدار کرده‌اید از هر
                    فروشگاهی خرید کنید. اما پیشنهاد ما خرید آنلاین است.
                  </p>
                </Panel>
                <Panel
                  header="من کارت بانکی بین‌المللی ندارم، چه طور باید آنلاین خرید کنم؟"
                  style={header_style}
                  key="22"
                >
                  <p style={text_style}>
                    شما می‌توانید در صورت توافق با سفارش دهنده، کالا را از
                    فروشگاه‌های فیزیکی نیز تهیه کنید. در این حالت، حتماً رسید و
                    فاکتور خرید را دریافت کنید و از اصالت کالا مطمئن شوید.
                  </p>
                </Panel>
                <Panel
                  header="آیا باید فاکتور و رسید پرداخت را نگه دارم؟"
                  style={header_style}
                  key="23"
                >
                  <p style={text_style}>
                    بله، باید حتماً فاکتور را دریافت و به خریدار و در صورت
                    اختلاف به بیلیگ ارائه دهید. همچنین فاکتور باید طبق توافقی
                    باشد که قبل از خرید با مشتری انجام داده‌اید.
                  </p>
                </Panel>
                <Panel
                  header="اگر قیمت محصول بعد از پرداخت خریدار تغییر کرد چه باید بکنم؟"
                  style={header_style}
                  key="24"
                >
                  <p style={text_style}>
                    در این صورت باید سریعاً این موضوع را با خریدار در میان
                    بگذارید و دوباره بر سر قیمت جدید توافق کنید. اگر توافق بعدی
                    حاصل شد، خریدار باید مابه‌التفاوت مبلغ را به حساب بیلیگ
                    واریز نماید و بعد از آن شما ۳ روز وقت دارید تا کالا را
                    خریداری کنید.
                  </p>
                </Panel>
                <Panel
                  header="چه تعداد سفارش می‌توانم قبول کنم؟"
                  style={header_style}
                  key="25"
                >
                  <p style={text_style}>
                    محدودیتی در این خصوص از طرف بیلیگ وجود ندارد.
                  </p>
                </Panel>
                <Panel
                  header="اگر نتوانستم تحویل گیرنده را در مقصد پیدا کنم چه کنم؟"
                  style={header_style}
                  key="26"
                >
                  <p style={text_style}>
                    اگر صاحب بسته/ خریدار را نتوانستید طی ۱ هفته پیدا کنید مبلغ
                    کالا به حساب شما واریز می‌شود ولی شما متعهد شده‌اید که این
                    بسته را به صاحب آن برسانید. بنابراین می‌توانید چاره‌ای
                    بیندیشید تا این بسته به صاحب آن برسد. مثلاً بسته را در یک
                    مکان معتبر (مثل اداره پست، هتل، امانات موزه و...) قرار دهید
                    تا صاحب بسته بعداً به آن‌جا مراجعه کند و آن را تحویل بگیرد.
                  </p>
                </Panel>
                <Panel
                  header="اگر بسته حین سفر آسیب ببیند یا گم شود باید چه کنم؟"
                  style={header_style}
                  key="27"
                >
                  <p style={text_style}>
                    شما متعهد شده‌اید که این بسته را سالم به دست صاحب آن رسانید
                    و در صورتی که مشکلی پیش بیاید ضرر و زیان آن به عهده شماست.
                  </p>
                </Panel>
              </Collapse>
            </TabPane>
            <TabPane tab="صاحب‌ بسته / خریدار" key="2">
              <Collapse accordion>
                <Panel header="بیلیگ چیست؟" style={header_style} key="1">
                  <p style={text_style}>
                    بیلیگ پلتفرمی است که صاحبان بسته و مشتریان کالا را به
                    مسافران متصل می‌کند. اگر شما بسته‌ای دارید که باید سریعاً به
                    نقطه‌ای از دنیا ارسال شود و یا از جایی سریعاً به دست شما
                    برسد و یا اینکه می‌خواهید از کشورهای دیگر خرید انجام دهید
                    (مانند خرید از آمازون و ...) ، بیلیگ می‌تواند به شما کمک
                    کند. کافی‌ست یک آگهی ثبت کنید و منتظر پیام یکی از مسافران
                    بمانید.
                  </p>
                </Panel>
                <Panel header="چرا بیلیگ؟" style={header_style} key="2">
                  <p style={text_style}>
                    بیلیگ یک پلتفرم خرید و پست سریع در ایران است که با ایجاد یک
                    شبکه جهانی از افراد مطمئن بستری را فراهم آورده است تا هر
                    شخصی در سراسر جهان بتواند بر پایه آن نیازهای خود را برطرف
                    کند و بسته‌های خود را ارزان‌تر و سریع‌تر از سایر روش‌ها به
                    مقصد ارسال کند.
                  </p>
                </Panel>
                <Panel
                  header="آیا بیلیگ مطمئن است؟"
                  style={header_style}
                  key="3"
                >
                  <p style={text_style}>
                    هنگام ثبت نام در بیلیگ، کاربران از طریق شماره تماس احراز
                    هویت می‌شوند. همچنین سیستم امتیازدهی سایت باعث می‌شود که شما
                    بتوانید افراد را اعتبارسنجی کنید. سیستم پرداخت امن بیلیگ هم
                    امکان هرگونه اختلافات و سوء‌استفاده‌های مالی را به نزدیک صفر
                    می‌رساند. اما از آنجا که بیلیگ یک پلتفرم واسطه‌ای می‌باشد،
                    رعایت احتیاط و توصیه‌های امنیتی شرط لازم است زیرا هیچ سیستم
                    مشابهی نیز در جهان 100 درصد مطمئن نیست. برای جلوگیری از
                    هرگونه مشکل احتمالی بیلیگ اقدام به جمع‌آوری قوانین گمرکی
                    کشورهای مختلف کرده است و همچنین در قسمت توصیه ها و قوانین
                    سایت می‌توانید مطالب بسیار مهمی پیدا کنید که به شما کمک
                    می‌کند از اشتباهات احتمالی که منجر به مشکلات می‌شوند جلوگیری
                    کنید.
                  </p>
                </Panel>
                <Panel
                  header="آیا ثبت نام در بیلیگ و ثبت آگهی رایگان است؟"
                  style={header_style}
                  key="4"
                >
                  <p style={text_style}>
                    بله، ثبت نام و ثبت آگهی در بیلیگ کاملاً رایگان می‌باشد.
                  </p>
                </Panel>
                <Panel
                  header="چگونه باید سفارش خود را در سایت ثبت کنم؟"
                  style={header_style}
                  key="5"
                >
                  <p style={text_style}>
                    بعد از ثبت نام در سایت می‌توانید آگهی حمل بسته یا خرید خود
                    را ثبت نمایید. پس از تایید و انتشار، آگهی شما در معرض دید
                    مسافران قرار می‌گیرد و آن‌ها می‌توانند پیشنهادهای خود را روی
                    آگهی شما قرار دهند. شما می‌توانید یکی از این پیشنهادها را قبول
                    نمایید. در صورتی که در طول ۱ ماه هیچ پیشنهادی دریافت نکنید و
                    یا هیچ پیشنهادی را قبول نکنید آگهی شما منقضی می‌شود و باید
                    آن را تمدید کنید. در صورتی که یک پیشنهاد از سوی مسافری را
                    قبول کنید دیگر امکان گذاشتن پیشنهاد روی آگهی شما از سوی
                    مسافران دیگر وجود نخواهد داشت و شما وارد فاز مذاکر با مسافر
                    می‌شوید. ( برای کسب اطلاعات کافی در مورد نحوه مذاکره با
                    مسافران این مطلب را بخوانید.) در صورتی که با مسافر به توافق
                    رسیدید، ۲ روز وقت دارید تا مبلغ را از طریق درگاه پرداخت
                    بیلیگ به حساب بیلیگ پرداخت کنید. اگر طی ۲ رزو پرداخت انجام
                    نشود آگهی شما دوباره در لیست آگهی‌های سایت منتشر می‌شود و
                    مسافران دیگر می‌توانند روی آن پیشنهاد بگذارند. بعد از اینکه
                    شما پرداخت را انجام دادید مسافر ۷ روز وقت دارد کالا را
                    خریداری کند. در صورتی که طی ۷ روز کالا خریداری نشود به شما
                    اطلاع داده می‌شود و شما می‌توانید آگهی را تمدید کنید و یا
                    کنسل کنید و مبلغ را تمام و کمال دریافت کنید.
                  </p>
                </Panel>
                <Panel
                  header="چگونه باید مسافران را پیدا کنم؟"
                  style={header_style}
                  key="6"
                >
                  <p style={text_style}>
                    شما فقط باید آگهی خود را در سایت ثبت نمایید و منتظر پیام
                    مسافران باشید. این مسافران هستند که شما را پیدا می‌کنند.
                  </p>
                </Panel>
                <Panel
                  header="اگر آگهی من پیشنهادی دریافت نکرد چی می‌شود؟"
                  style={header_style}
                  key="7"
                >
                  <p style={text_style}>
                    اگر طی ۱ ماه هیچ پیشنهادی دریافت نکردید آگهی شما منقضی
                    می‌شود و باید دوباره آن را رایگان تمدید کنید.
                  </p>
                </Panel>
                <Panel
                  header="وقتی یک پیشنهاد را قبول کردم چی می‌شود؟"
                  style={header_style}
                  key="8"
                >
                  <p style={text_style}>
                    در صورت پذیرفتن یک پیشنهاد، شما وارد مرحله مذاکره با مسافر
                    می‌شوید و در صورت توافق باید طی ۲ روز مبلغ مورد توافق را به
                    حساب بیلیگ واریز نمایید.
                  </p>
                </Panel>
                <Panel
                  header="دست‌مزد مسافران چقدر است؟"
                  style={header_style}
                  key="9"
                >
                  <p style={text_style}>
                    دست‌مزد مسافران توافقی است و بین شما و مسافر تعیین می‌شود و
                    بیلیگ هیچ دخالتی در آن ندارد.
                  </p>
                </Panel>
                <Panel
                  header="چه موقع باید هزینه را پرداخت کنم؟"
                  style={header_style}
                  key="10"
                >
                  <p style={text_style}>
                    پس از توافق با مسافر ۲ روز وقت دارید تا مبلغ را به حساب
                    بیلیگ واریز نمایید.
                  </p>
                </Panel>
                <Panel
                  header="کمیسیون بیلیگ چقدر است؟"
                  style={header_style}
                  key="11"
                >
                  <p style={text_style}>
                    کمیسیون بیلیگ ۵ درصد مبلغ پرداختی به سایت می‌باشد.
                  </p>
                </Panel>
                <Panel
                  header="اگر مسافر سفارش مرا نخرید چه کنم؟"
                  style={header_style}
                  key="12"
                >
                  <p style={text_style}>
                    پس از اینکه شما مبلغ را به حساب بیلیگ واریز نمودید مسافر ۷
                    روز وقت دارد تا کالا را خریداری کند در غیر این صورت آگهی شما
                    به لیست آگهی‌ها برگردانده می‌شود و یا در صورتی که نخواهید
                    آگهی را ادامه دهید، مبلغ به طور کامل به حساب شما
                    بازگردانده می‌شود.
                  </p>
                </Panel>
                <Panel
                  header="اگر مسافر سفارش را اشتباه خرید چه می‌شود؟"
                  style={header_style}
                  key="13"
                >
                  <p style={text_style}>
                    در این مورد باید درفاز مذاکره همه موارد را با مسافر توافق
                    کنید و در صورت بروز مشکل و اشتباه از سمت مسافر، ضرر و زیان
                    آن به عهده خود مسافر می‌باشد. اما چنانچه کالایی که خریداری
                    شده است مطابق با آگهی ثبت شده باشد و یا مطابق مواردی که
                    هنگام مذاکره بین صاحب آگهی و مسافر بر سر آن توافق شده، باشد؛
                    در این صورت حق با مسافر است و هزینه به مسافر پرداخت خواهد
                    شد.
                  </p>
                </Panel>
                <Panel
                  header="اگر مسافر سفارش/بسته را گم کرد یا آسیبی به آن زد چه می‌شود؟"
                  style={header_style}
                  key="3"
                >
                  <p style={text_style}>
                    در این صورت ضرر و زیان آن به عهده مسافر است.
                  </p>
                </Panel>
                <Panel
                  header="مبلغ را باید به مسافر بدهم یا به بیلیگ؟"
                  style={header_style}
                  key="14"
                >
                  <p style={text_style}>
                    به بیلیگ، شما به هیچ وجه نباید مبلغی به مسافران پرداخت کنید.
                    تمام مبالغ نزد بیلیگ به امانت می‌ماند تا خیال شما راحت باشد.
                    پس از اینکه شما بسته را تحویل گرفتید، مبلغ به حساب مسافر
                    واریز می‌شود.
                  </p>
                </Panel>
                <Panel
                  header="چقدر طول می‌کشد تا بسته به دست من برسد؟"
                  style={header_style}
                  key="15"
                >
                  <p style={text_style}>
                    این بستگی به تاریخ پرواز مسافر دارد که شما باید طبق نیازتان
                    از بین پیشنهادهایی که به شما می‌شود مسافری را انتخاب کنید که
                    بسته را در زمان مطلوب به دستتان می‌رساند.
                  </p>
                </Panel>
                <Panel
                  header="چه کالاهایی را می‌توانم سفارش دهم؟"
                  style={header_style}
                  key="16"
                >
                  <p style={text_style}>
                    مسلماً کالاهایی را می‌توانید سفارش دهید که با قوانین کشور
                    مبدا و مقصد مطابقت داشته باشد و منعی از جانب گمرک و خطوط
                    هوایی نداشته باشد. قوانین گمرکی کشورهای مختلف را می‌توانید
                    <a target="_blank" rel="noopener noreferrer" href={'/rules'}> اینجا </a> بخوانید.
                  </p>
                </Panel>
              </Collapse>
            </TabPane>
          </Tabs>
          <Divider />
        </Col>
      </Row>
    </div>
  );
};

export default Faq;
