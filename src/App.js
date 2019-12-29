import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { CheckUserLogin } from './components/actions/api';
import * as actions from './components/actions';
import './App.css';
import { MyStylesheet } from './components/styles'
import { Icon, Logo } from './components/svg';

const Landing = () => {
  const styles = MyStylesheet()
  return (<div style={{ ...styles.generalContainer, ...styles.generalFont }}>
    <div style={{ ...styles.flex1, ...styles.showBorder }}>
      Hello Construction App
  </div>

  </div>)
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { render: '', width: 0, height: 0 }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.props.reduxNavigation({ position: 'open' })
    this.checkuser()
    this.updateWindowDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  async checkuser() {
    let response = await CheckUserLogin();
    console.log(response)
  }
  showRouter() {
    return (<BrowserRouter>
      <div className="general-container">

        <Switch>
          <Route exact path="/" component={Landing} />


        </Switch>

      </div>
    </BrowserRouter>)
  }
  app400open() {
    const styles = MyStylesheet();
    return (<div style={{ ...styles.generalFlex }}>
      <div style={{ ...styles.flex1 }}>

        <div style={{ ...styles.generalFlex }}>
          <div style={{ ...styles.flex1, ...styles.headerBackground, ...styles.thickBorder, ...styles.alignCenter, ...styles.addMargin, ...styles.addBorderRadius }}>
            <button style={{ ...styles.logoIcon, ...styles.generalButton, ...styles.headerBackground, ...styles.addBorderRadius }} onClick={() => { this.toogleappmenu() }}>{Icon()}</button>
          </div>
          <div style={{ ...styles.flex2, ...styles.headerBackground, ...styles.thickBorder, ...styles.addMargin, ...styles.addBorderRadius }}>
            {Logo()}
          </div>
        </div>

        <div style={{ ...styles.generalFlex }}>
          <div style={{ ...styles.flex2, ...styles.headerBackground, ...styles.thickBorder, ...styles.addBorderRadius, ...styles.addMargin, ...styles.addPadding }}>
            <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addBottomMargin }}>&nbsp;</div>
            <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addBottomMargin }}>&nbsp;</div>
            <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addBottomMargin }}>&nbsp;</div>
          </div>
          <div style={{ ...styles.flex1, ...styles.showBorder }}>
            {this.showRouter()}
          </div>
        </div>





      </div>

    </div>)

  }
  app400closed() {
    const styles = MyStylesheet();
    return (
      <div style={{ ...styles.generalFlex }}>
        <div style={{ ...styles.flex1 }}>

          <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1, ...styles.headerBackground, ...styles.thickBorder, ...styles.addBorderRadius, ...styles.addMargin }}>
              <button style={{ ...styles.logoIcon, ...styles.generalButton, ...styles.headerBackground, ...styles.alignCenter, ...styles.addBorderRadius }} onClick={() => { this.toogleappmenu() }}>{Icon()}</button>
            </div>
            <div style={{ ...styles.flex2, ...styles.headerBackground, ...styles.thickBorder, ...styles.addBorderRadius, ...styles.addMargin }}>
              {Logo()}
            </div>
          </div>

          <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
            <div style={{ ...styles.flex1, ...styles.thickBorder, ...styles.navContainer, ...styles.addMargin }}>
              &nbsp;
                </div>
            <div style={{ ...styles.flex1, ...styles.thickBorder, ...styles.navContainer, ...styles.addMargin }}>
              &nbsp;
                </div>
            <div style={{ ...styles.flex1, ...styles.thickBorder, ...styles.navContainer, ...styles.addMargin }}>
              &nbsp;
                </div>
          </div>

          <div style={styles.generalContainer}>
            {this.showRouter()}
          </div>

        </div>
      </div>)

  }
  app1200open() {
    const styles = MyStylesheet();
    return (
      <div style={{ ...styles.generalFlex }}>
        <div style={{ ...styles.flex1, ...styles.extraThickBorder, ...styles.addBorderRadius, ...styles.headerBackground, ...styles.openNav, ...styles.addRightMargin, ...styles.addLeftMargin }}>

          <button style={{ ...styles.logoIcon, ...styles.generalButton, ...styles.headerBackground, ...styles.alignCenter, ...styles.addBorderRadius }} onClick={() => { this.toogleappmenu() }}>{Icon()}</button>

          <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin }}></div>
          <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin }}></div>
          <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin }}></div>


        </div>
        <div style={{ ...styles.flex3 }}>

          <div style={{ ...styles.generalContainer, ...styles.headerBackground, ...styles.extraThickBorder, ...styles.addBorderRadius, ...styles.addRightMargin }}>{Logo()}</div>

          <div style={{ ...styles.generalFlex, ...styles.regularFont }}>
            <div style={{ ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin }}></div>
            <div style={{ ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin }}></div>
            <div style={{ ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin }}></div>
          </div>

          <div style={styles.generalContainer}>
            {this.showRouter()}
          </div>


        </div>
      </div>)

  }
  app1200closed() {
    const styles = MyStylesheet();
    return (
      <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
        <div style={{ ...styles.flex1 }}>

          <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
            <div style={{ ...styles.flex1 }}>



              <div style={{ ...styles.generalFlex, ...styles.generalFont }}>

                <div style={{ ...styles.flex1, ...styles.headerBackground, ...styles.iconBorder, ...styles.alignCenter, ...styles.iconBorder, ...styles.addMarginTop, ...styles.addBottomMargin, ...styles.addLeftMargin }}>
                  <button style={{ ...styles.logoIcon, ...styles.generalButton, ...styles.headerBackground }} onClick={() => { this.toogleappmenu() }}>{Icon()}</button>
                </div>

                <div style={{ ...styles.flex3, ...styles.headerBackground, ...styles.logoBorder, ...styles.addMarginTop, ...styles.addBottomMargin, ...styles.addRightMargin }}>

                  {Logo()}

                </div>
              </div>

              <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
                <div style={{ ...styles.flex1, ...styles.thickBorder, ...styles.navContainer, ...styles.addMargin }}>
                  &nbsp;
                </div>
                <div style={{ ...styles.flex1, ...styles.thickBorder, ...styles.navContainer, ...styles.addMargin }}>
                  &nbsp;
                </div>
                <div style={{ ...styles.flex1, ...styles.thickBorder, ...styles.navContainer, ...styles.addMargin }}>
                  &nbsp;
                </div>
                <div style={{ ...styles.flex1, ...styles.thickBorder, ...styles.navContainer, ...styles.addMargin }}>
                  &nbsp;
                </div>
              </div>

              <div style={styles.generalContainer}>
                {this.showRouter()}
              </div>

            </div>
          </div>




          <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
            <div style={{ ...styles.flex1, ...styles.showBorder }}>
              &nbsp;
            </div>
          </div>



        </div>
      </div>
    )

  }
  toogleappmenu() {
    if (this.props.navigation) {
      if (this.props.navigation.hasOwnProperty("position")) {
        let position = this.props.navigation.position;
        if (position === 'closed') {
          this.props.reduxNavigation({ position: 'open' })
        } else if (position === "open") {
          this.props.reduxNavigation({ position: 'closed' })
        }

      }
    }
  }
  handleapp() {
    if (this.props.navigation) {
      if (this.props.navigation.position === 'closed') {
        if (this.state.width > 800) {
          return (this.app1200closed())
        } else {
          return (this.app400closed())
        }

      } else {
        if (this.state.width > 800) {
          return (this.app1200open())
        } else {
          return (this.app400open())
        }


      }
    } else {

      if (this.state.width > 800) {
        return (this.app1200open())
      } else {
        return (this.app400open())
      }


    }
  }
  render() {
    const styles = MyStylesheet();

    return (this.handleapp());
  }
}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    navigation: state.navigation
  }
}

export default connect(mapStateToProps, actions)(App);