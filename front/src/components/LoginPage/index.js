import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { saveIdLogin, saveIdShop } from '../../actions/index'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import logo from './images/sixtines_logo.png';




const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
});



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

            login: "",
            password: "",
            showPassword: false,
            isValide: true,
            isSubmited: false,
            nextRoute: '/agent-homepage'

        };
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };


    handleChange(ev) {
        this.setState({ [ev.target.name]: ev.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();


        const url = `/api/${this.state.nextRoute === '/agent-homepage' ? 'profile/login-sales' : 'profile/login-customers'}`

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ login: this.state.login, password: this.state.password })
        })
            .then(res => res.json())
            .then(data => {
                if (this.state.nextRoute === '/agent-homepage') {


                    this.props.saveIdLogin(data.id)
                } else {
                    this.props.saveIdShop(data.id)
                }
                this.setState({
                    isValide: data.isValide,
                    isSubmited: data.isValide
                })
            })
    }
    componentDidMount() {
        if (this.props.location.pathname === "/sales") {
            return
        } else {
            this.setState({
                nextRoute: '/shop-homepage'
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.isSubmited !== prevState.isSubmited && this.state.isValide === true) {
            this.props.history.push(this.state.nextRoute)
        }
    }



    render() {
        const { classes } = this.props;
        return (
            <div>
                
                <div className="login_container">
                    <div className="login_background_container">

                    </div>
                    <div className="login_form_container"> 
                    
                        <img className="login_background_container_image" src={logo} alt="logo"></img>
                       
                        <form className="login_form" onSubmit={(event) => this.handleSubmit(event)}>

                            <div className="login_country_container login_margin_auto">
                                <TextField
                                    id="standard-name"
                                    label="Login"
                                    name="login"
                                    style={{ width: 300 }}
                                    className={classes.textField}
                                    value={this.state.login}
                                    onChange={(ev) => this.handleChange(ev)}
                                    margin="normal"
                                />
                            </div>

                            <div className="login_password_container login_margin_auto">
                                <FormControl className={classNames(classes.margin, classes.textField)}>
                                    <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                    <Input
                                        id="adornment-password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={(ev) => this.handleChange(ev)}
                                        name="password"
                                        style={{ width: 300 }}
                                        autoComplete="myPassword"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                >
                                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <div className="login_errormsg login_margin_auto">
                                        {!this.state.isValide && !this.state.isSubmited && <h3>Bad login or Password</h3>}
                                    </div>
                                </FormControl>
                            </div>

                            <div className="login_bouton_container login_margin_auto">
                                <Button variant="outlined" type="submit" className={classes.button}>SEND</Button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ saveIdLogin, saveIdShop }, dispatch)
}


export default connect(null, mapDispatchToProps)(withStyles(styles)(Login));




