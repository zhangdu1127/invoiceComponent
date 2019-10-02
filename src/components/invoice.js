import React from "react";
import "../css/invoice.css";
export default class InvoiceBtn extends React.Component {
  /**
   * url 提交地址
   * method 提交方法
   * contentText 显示的文本内容
   */
  constructor(props) {
    super(props);
    this.state = { url: this.props.url, method: this.props.method, contentText: this.props.contentText }
    this.show = this.show.bind(this)
  }
  //显示invoice组件
  show() {
    document.getElementById("invoice").style.display = "block";
  }
  render() {
    return <div className="invoice">
      <span onClick={this.show}>{this.state.contentText}</span>
      <Invoice></Invoice>
    </div>
  }
}

//Invoice 模态框组件
class Invoice extends React.Component {
  constructor(props) {
    super(props);
    /**
     *    
     * <!-- 发送给后台时后台接收的数据name
     * invoice_title 发票标题
     * invoice_num   发票数字
     * invoice_default 是否设当前输入值为默认值
     * -->
     * url 表单发送的地址
     * method 表单发送的方法
     * 
     * isShow 是否显示当前框
     * invoice_btnObj 弹出Invoice组件的按钮对象
     * reg_num 当前发票数字类型的正则
     */
    this.state = { invoice_title: "", invoice_num: "", invoice_default: false, url: this.props.url, method: this.props.method, reg_num: /^\d+$/, isShow: true };
    //将方法绑定到当前对象
    this.changeVal = this.changeVal.bind(this);
    this.isShowInvoice = this.isShowInvoice.bind(this);
    this.clearVal = this.clearVal.bind(this);
  }
  //获取输入框的值 双向绑定
  changeVal(e) {
    var event = e || window.event;
    var value = e.target.type === "checkbox" ? event.target.checked : event.target.value;
    //监控当前的输入框
    //当输入的是invoice_num时
    if (event.target.name === "invoice_num") {
      //设定当前的值只能是数字类型
      if (this.state.reg_num.test(value)) {
        this.setState({ [event.target.name]: value });
      }
    }
    //其他类型的
    else {
      this.setState({ [event.target.name]: value });
    }
  }
  //清空当前表单内容
  clearVal() {
    this.setState({ invoice_title: "", invoice_num: "" })
  }
  //是否显示当前窗口
  isShowInvoice(e) {
    let event = e || window.event;
    event.preventDefault();

    let invoice = document.getElementById("invoice");
    if (this.state.isShow) {
      invoice.style.display = "none";
    }
    else {
      invoice.style.display = "block";
    }
    //清空输入
    this.clearVal();
    //清空选中
    document.getElementById("invoice_checkbox").checked = false
  }
  /**生命周期
   * 
   */
  componentDidMount() {
  }
  render() {
    return (
      // Invoice组件 JSX
      <form id="invoice" className="invoice_wrap" action={this.state.url} method={this.state.method}>
        <div className="invoice_box">
          <ul>
            <li className="invoice_close"><span title="关闭当前弹窗" onClick={this.isShowInvoice}>&times;</span></li>
            <li className="invoice_title">
              <h2>Add new invoice infomation</h2>
            </li>
            <li className="invoice_input">
              <label title="输入标题" htmlFor="invoice_title">Invoice title：</label>
              <input autoFocus required type="text" id="invoice_title" name="invoice_title" value={this.state.invoice_title} onChange={this.changeVal} />
            </li>
            <li className="invoice_input">
              <label title="输入数字" htmlFor="invoice_num">Taxpayer's registration number：</label>
              <input required type="text" id="invoice_num" name="invoice_num" value={this.state.invoice_num} onChange={this.changeVal} />
            </li>
            <li className="invoice_submit">
              <input type="checkbox" id="invoice_checkbox" name="invoice_default" onChange={this.changeVal} />
              <label htmlFor="invoice_checkbox">Set as default</label>
              <input title="保存当前值" type="submit" value="Save" />
              <input title="取消当前值" type="reset" value="Cancal" onClick={this.clearVal} />
            </li>
          </ul>
        </div>
      </form>
    );
  }
}