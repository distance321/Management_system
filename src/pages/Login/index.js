import React, { PureComponent } from 'react';
import { Login } from 'ant-design-pro';
import { Alert } from 'antd';
import Styles from './index.css';
import { connect } from 'dva';
const {  UserName, Password, Submit } = Login;
@connect(({ login, loading, menus  }) => ({
	login,
	menus,
	submitting: loading.effects['login/login']
}))
class LoginPage extends PureComponent {
	state = {
		show_num : [],
		inputVal : '',
		alertVAl : null
	}

	componentDidMount(){
		sessionStorage.removeItem('token')
		sessionStorage.removeItem('username')
		this.validation()
	}

	validation = () => {
		this.draw(this.state.show_num)
	}

	handleClickOnCanvas = () => {
		this.draw(this.state.show_num)
	}

	changeInput = event => this.setState({ inputVal: event.target.value });

	draw =(show_num) => {
        let canvas_width=100;
		let canvas_height=43;
        let canvas = this.canvas;//获取到canvas的对象，演员
        let context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        let sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        let aCode = sCode.split(",");
        let aLength = aCode.length;//获取到数组的长度
        
        for (let i = 0; i <= 3; i++) {
            let j = Math.floor(Math.random() * aLength);//获取到随机的索引值
            let deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            let txt = aCode[j];//得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            let x = 10 + i * 20;//文字在canvas上的x坐标
            let y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";

            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = this.randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (let i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = this.randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (let i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = this.randomColor();
            context.beginPath();
            let x = Math.random() * canvas_width;
            let y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
	}
	randomColor =() => {//得到随机的颜色值
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
	renderFrom = () => {
		const { login, submitting } = this.props;
		const { alertVAl } = this.state
		return (
			<div>
				<div className={Styles.title}>管理系统</div>
				<Login
					className={Styles.form}
					onSubmit={this.onSubmit}
					ref={form => {
						this.loginForm = form;
					}}
				>
					{ login.status === 'error' && !submitting && this.renderMessage('用户名或者密码错误')}
					{ alertVAl ? this.renderMessage(alertVAl) : null }
					<UserName
						name="username"
						placeholder="用户名"
						rules={[
							{
								required: true,
								message: '请输入用户名'
							}
						]}
					/>
					<Password
						name="password"
						placeholder="密码"
						rules={[
							{
								required: true,
								message: '请输入密码'
							}
						]}
						onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
					/>
					<div className = {Styles.code}>
						<input type="text" placeholder={"请输入验证码（不区分大小写）"} onChange={this.changeInput} className={Styles.inputVal}/>
						<canvas className={Styles.canvas} width='95' height='43' ref={canvas => this.canvas = canvas} onClick = {this.handleClickOnCanvas} ></canvas>				
					</div>
					<Submit loading={submitting}>登录</Submit>
				</Login>
			</div>
		);
	};

	renderMessage = content => <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;

	onSubmit = (error, values) => {
		let val = this.state.inputVal.toLowerCase()
		let num = this.state.show_num.join("");
		if(val===''){
			this.setState({
				alertVAl : '请输入验证码！'
			})
		}else if(val === num && !error){
			this.setState({
				inputVal : '',
				alertVAl : null
			})
			const { dispatch } = this.props;
			dispatch({
				type: 'login/login',
				payload: values
			});
			this.draw(this.state.show_num);
		}else{
			this.setState({
				inputVal : '',
				alertVAl :'验证码错误！请重新输入！'
			})
			this.draw(this.state.show_num);
		}
	};

	render() {
		return <div className={Styles.container}>{this.renderFrom()}</div>;
	}
}

export default LoginPage;
