import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

  }

  componentWillMount(){
    this.fetchCommodityList(0);
  }

    fetchCommodityList = (currentPage) => {
        let isSuccess = false;
        this._isMounted = true;
        const type = "all";
        const url = "/api/Commodity/search/" + type + "/" + currentPage;

        //赛跑模式：新的Promise和fetch比赛，谁率先返回，就把该谁的Promise实例返回值传递给下面的.then()或者是.catch()
        Promise.race([
            fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            }),
            new Promise(function (resolve, reject) {
                setTimeout(() => reject(new Error('request timeout')), 3000)//让fetch先跑3000毫秒，如果他还没到终点我就跑了
            })]).then((response) => {
            if (response.ok === true) {
                isSuccess = response.ok;
            }
            return response.json()
        }).then((json) => {
            if (isSuccess) {
                //请求成功：fetch先返回了信息
                // this.setCommodityList(json);
                if (json.length > 0) {
                    this.currentPage = this.currentPage + 1;
                }
                if (this._isMounted) {
                    this.setState({showLoadingProgress: false});
                }
            }
        }).catch(() => {
            if (this._isMounted) {
                //请求失败：fetch超时了，开始下一局比赛
                this.setState({
                    disconnect: true
                });
            }
            // this.fetchTimes++;
            // if (this.fetchTimes <= 5) {
            //     console.log('第' + this.fetchTimes + '次请求');
            //     this.fetchCommodityList(currentPage);
            // }
        });
    };

  render() {
    return (
      <div className="App">
        <text>1122</text>
      </div>
    );
  }
}

export default App;
