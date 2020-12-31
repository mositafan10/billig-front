import React, { Component } from "react";
import { Modal, Button } from "antd";

class OfferAdvices extends Component {
  state = {
    adviceVisible: false,
  };

  showAdvice = () => {
    this.setState({ adviceVisible: true });
  };

  closeAdviceVisible = () => {
    this.setState({ adviceVisible: false });
  };

  showtext = (data, type, buy) => {
    switch (data) {
      case "در انتظار پاسخ":
        return type == "billliger" ? (
          <div style={{ textAlign: "justify" }}>
            <b>از محیط چت بیلیگ استفاده کنید</b>
            <br />
            سعی کنید مذاکرات خود را از طریق محیط چت بیلیگ انجام دهید؛ حسن این
            کار در این است که اگر بعداً اختلافی پیش بیاید، تمام مذاکرات در محیط
            چت بیلیگ ذخیره شده‌اند و رسیدگی به اختلاف آسوده‌تر انجام خواهد گرفت.
            <p>
              <br />
              <b>بیعانه ندهید</b> <br />
              هرگز پیش از دریافت کالا، هزینه‌ای تحت عنوان بیعانه، شیرینی، رزرو
              و... پرداخت نکنید. در صورتی که مسافر از شما درخواست بیعانه کرد،
              لطفاً مورد را به تیم پشتیبانی بیلیگ اطلاع دهید.
            </p>
            <br />
            {!buy && (
              <p>
                {" "}
                <b>اطلاعات پرواز را چک کنید</b>
                <br />
                حتما از طریق سایت ایرلاین و فرودگاه‌ها صحت ساعت و روز پرواز ادعا
                شده توسط مسافر را بررسی نمایید.
              </p>
            )}
          </div>
        ) : (
          <div style={{ textAlign: "justify" }}>{/* traveler */}</div>
        );
        break;
      case "در انتظار خرید":
        return type == "billliger" ? (
          <div style={{ textAlign: "justify" }}>
            <p>
              <b>در مکان‌های عمومی قرار بگذارید</b>
              <br />
              یک نکته مهم در تحویل گرفتن و تحویل دادن بسته‌ها، مکان قرار گذاشتن
              است. مسلماً اگر این قرار در یک مکان عمومی باشد، از امینت بالاتری
              برخوردار است.
            </p>
            <p>
              <b>از اصالت کالا مطمئن شوید</b>
              <br />
              هنگام تحویل گرفتن کالا از مسافر، حتماً از او فاکتور و رسید خرید
              بخواهید و در صورت امکان با استفاده از درج بارکد و یا سایر روش‌ها
              از اصالت کالا در سایت فروشنده اطمینان حاصل نمایید.
            </p>
          </div>
        ) : (
          <div style={{ textAlign: "justify" }}>
            <p>
              <b>بسته را کاملا بررسی کنید</b>
              <br />
              مسافران این حق را دارند که بسته‌هایی که تحویل می‌گیرند را کاملاً
              بررسی کنند و داخل آن را ببینند. این کار باعث اطمینان خاطر مسافر
              می‌شود و بیلیگر نیز نباید از این کار ممانعت کند. در ضمن توصیه
              می‌شود بسته‌هایی را که امکان بررسی دقیق آن‌ها ‌وجود ندارد، تحویل
              نگیرید.
            </p>
            <p>
              <b>هنگام خرید کالا، حتماً رسید و فاکتور بگیرید</b>
              <br />
              اگر قرار است کالایی را خریداری کنید، حتماً رسید و فاکتور خرید را
              از فروشنده بگیرید و هنگام تحویل کالا به مشتری تحویل دهید. همچنین
              ممکن است رسید و فاکتور خرید برای ارائه در فرودگاه و گمرک جهت اظهار
              قیمت هم نیاز ‌باشد. حتی با بیلیگر توافق کرده‌اید تا بسته را خریده
              و از پلمپ خارج کنید و بدون جعبه همراه خود بیاورید، بهتر است بارکد
              روی جعبه را جدا کرده و به همراه فاکتور با خود بیاورید.
            </p>
          </div>
        );
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.showAdvice.bind(this)}
          style={{ borderRadius: "8px" }}
        >
          توصیه‌ها
        </Button>
        <Modal
          title="توصیه‌های کاربردی"
          visible={this.state.adviceVisible}
          onCancel={this.closeAdviceVisible}
          okButtonProps={{ hidden: "true" }}
          cancelText="بازگشت"
          style={{
            fontFamily: "VazirD",
            textAlign: "center",
            overflow: "hidden",
            borderRadius: "10px",
          }}
        >
          {this.showtext(this.props.data, this.props.type, this.props.buy)}
        </Modal>
      </div>
    );
  }
}

export default OfferAdvices;
