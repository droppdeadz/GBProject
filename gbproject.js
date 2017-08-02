import React, { Component } from 'react';
import { StackNavigator, } from 'react-navigation';
import LocalizedStrings from 'react-native-localization';
import styles from './css';
import {
    Alert,
    StyleSheet,
    AsyncStorage,
    Text,
    View,
    Image,
    Button
} from 'react-native';
const STORAGE_KEY1 = 'Garbage:data1'
const STORAGE_KEY2 = 'Garbage:data2'
const STORAGE_KEY3 = 'Garbage:data3'
const STORAGE_KEY4 = 'Garbage:data4'
let strings = new LocalizedStrings({
    EN: {
        lang: 'ENGLISH',
        homepage: "GARBAGE GAME",
        homepageButton1: "START GAME",
        homepageButton2: "TUTORIAL",
        homepageButton3: "STATISTIC",
        playingScore: "SCORE",
        binType1: "GENERAL WASTE",
        binType2: "COMPOSTABLE WASTE",
        binType3: "RECYCLE WASTE",
        binType4: "HAZARDOUS WASTE",
        playingButton1: "STOP",
        playingButton2: "SELECT",
        playingAlert1: "Your Score",
        playingAlert2: ".",
        tutorial: "TUTORIAL",
        GWDetail: "Used plastic container, Straw, Candy bag, Snack bag, Instant noodle bag, Tissue paper, Food box, Foam box, Paper cup, Instant noodle cup, Cloth",
        CWDetail: "Food waste, Fruit and Vegetable Peels, Cloth, Meats",
        RWDetail: "Empty plastic bottle, Empty plastic cup, Empty glass bottle ,Broken glass, Empty can, Metal, Empty beverage container, Piece of paper, Plastic bag",
        HWDetail: "Cleaning solution, Insecticide, Thinner, Expired medicine, Cosmetics, Engine oils, Light bulb/ Fluorescent, Battery, Car battery",
        allstat: "CMU STATISTIC",
        gamestat: "GAME STATISTIC",
        alert1: "Correct!!",
        alert2: "Congratulation ! +1 point",
        alert3: "OK",
        alert4: "Wrong!!",
        alert5: "You pick the wrong bin."
    },
    TH: {
        lang: 'ภาษาไทย',
        homepage: "GARBAGE GAME",
        homepageButton1: "เริ่มเกม",
        homepageButton2: "แนะนำ",
        homepageButton3: "สถิติ",
        playingScore: "คะแนน",
        binType1: "ขยะทั่วไป",
        binType2: "ขยะย่อยสลาย",
        binType3: "ขยะรีไซเคิล",
        binType4: "ขยะอันตราย",
        playingButton1: "หยุด",
        playingButton2: "เลือก",
        playingAlert1: "คะแนนของคุณ",
        playingAlert2: " คะแนน",
        tutorial: "แนะนำ",
        GWDetail: "พลาสติกที่ใส่อาหารแล้ว, หลอด, ซองขนม, ซองลูกอม, ซองบะหมี่, กระดาษทิชชู่, กล่องอาหาร, กล่องโฟม, แก้วกระดาษใส่เครื่องดื่ม, มาม่าคัพ, เศษผ้า",
        CWDetail: "เศษอาหาร, เปลือกผลไม้, เศษผ้า, เศษเนื้อสัตว์, ผัก",
        RWDetail: "ขวดพลาสติกเปล่า, แก้วพลาสติกเปล่า, ขวดแก้วเปล่า, เศษแก้ว, กระป๋องน้ำอัดลมเปล่า, โลหะ, กล่องเครื่องดื่มเปล่า, เศษกระดาษ, ถุงก๊อบแก๊บ",
        HWDetail: "น้ำยาทำความสะอาด, ยาฆ่าแมลง, ทินเนอร์, ยาหมดอายุ, เครื่องสำอาง, น้ำมันเครื่อง, หลอดไฟ/หลอดฟลูออเรสเซนต์, ถ่ายไฟฉาย, แบตเตอร์รี่รถยนต์",
        allstat: "สถิติภายในมหาลัย",
        gamestat: "สถิติเกมส์",
        alert1: "ถูกต้อง!!",
        alert2: "+1 คะแนน",
        alert3: "ตกลง",
        alert4: "ผิด!!",
        alert5: "คุณเลือกทิ้งขยะผิดชนิด"
    }
});
class gbproject extends Component {
    static navigationOptions = {
        title: '',
    };

    constructor() {
        super()
        this.state = {

        }

    }
    _onSetLanguage() {

        if (strings.getLanguage() == 'EN') {
            strings.setLanguage('TH');
            this.setState({});
        } else {
            strings.setLanguage('EN');
            this.setState({});
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <Button
                    title={strings.lang}
                    onPress={() => this._onSetLanguage()}
                    color='#79b506'
                />

                <Text style={styles._head}>{strings.homepage}</Text>
                <View style={styles.logo}>
                    <Image style={{ width: 150, height: 150 }} source={require('./img/garbage.png')} />
                </View>
                <View style={styles.buttonRow}>
                    <View style={styles._button} >
                        <Button color='#79b506' title={strings.homepageButton1} onPress={() => navigate('Play')} />
                    </View>
                    <View style={styles._button} >
                        <Button color='grey' title={strings.homepageButton2} onPress={() => navigate('Tutorial')} />
                    </View>
                    <View style={styles._button} >
                        <Button color='darkgrey' title={strings.homepageButton3} onPress={() => navigate('Statistic')} />
                    </View>
                </View>
            </View>

        );
    }
}
class playing extends Component {
    static navigationOptions = {
        title: '',
    };

    constructor() {
        super();
        this.state = {
            score: [0, 0, 0, 0],
            score1: 0,
            score2: 0,
            score3: 0,
            score4: 0,
            playing: true,
            bin: [true, false, false, false],
            imgShow: 0,
            binImg: [require('./img/bin.png')
                , require('./img/bin2.png')
                , require('./img/bin3.png')
                , require('./img/bin4.png')],
            imgName: ['Can',
                'Candy Bag',
                'Car Battery',
                'Cleaning Solution',
                'Cloth',
                'Empty Bottle',
                'Food Waste',
                'Fruits Peels',
                'Insectiside',
                'Light Bulb',
                'Noodle Bag',
                'Paper',
                'Plastic Bag',
                'Snack Bag',
                'Straw',
                'Tissue',
                'Plastic Container',
                'Foodbox',
                'Foambox',
                'Papercup',
                'Noodlecup',
                'Metal',
                'Thinner',
                'Cosmetics',
                'Engineoils',
                'Fluorescent',
                'Battery'],
            img: [require('./img/can.png')
                , require('./img/candybag.png')
                , require('./img/carbattery.png')
                , require('./img/cleaningsolution.png')
                , require('./img/cloth.png')
                , require('./img/emptybottle.png')
                , require('./img/foodwaste.png')
                , require('./img/fruitpeels.png')
                , require('./img/insectiside.png')
                , require('./img/lightbulb.png')
                , require('./img/noodlebag.png')
                , require('./img/paper.png')
                , require('./img/plasticbag.png')
                , require('./img/snackbag.png')
                , require('./img/straw.png')
                , require('./img/tissue.png')
                , require('./img/usedplaticcontainer.png')
                , require('./img/foodbox.png')
                , require('./img/foambox.png')
                , require('./img/papercup.png')
                , require('./img/noodlecup.png')
                , require('./img/metal.png')
                , require('./img/thinner.png')
                , require('./img/cosmetics.png')
                , require('./img/engineoils.png')
                , require('./img/fluorescent.png')
                , require('./img/battery.png')
            ]
        }

        this._changeBut()
    }

    _showPic() {
        return this.state.img[this.state.imgShow]
    }

    _randomWaste() {
        this.setState({
            imgShow: Math.floor(Math.random() * 26)
        },
            () => this._changeBut())
    }

    componentDidMount() {
        AsyncStorage.getItem(STORAGE_KEY1)
            .then((value) => {
                this.setState({
                    score1: (value == null) ? 0 : parseInt(value, 10),
                })
            }).catch((error) => console.log('AsyncStorage:' + error.message))
        AsyncStorage.getItem(STORAGE_KEY2)
            .then((value) => {
                this.setState({
                    score2: (value == null) ? 0 : parseInt(value, 10),
                })
            }).catch((error) => console.log('AsyncStorage:' + error.message))
        AsyncStorage.getItem(STORAGE_KEY3)
            .then((value) => {
                this.setState({
                    score3: (value == null) ? 0 : parseInt(value, 10),
                })
            }).catch((error) => console.log('AsyncStorage:' + error.message))
        AsyncStorage.getItem(STORAGE_KEY4)
            .then((value) => {
                this.setState({
                    score4: (value == null) ? 0 : parseInt(value, 10),
                })
            }).catch((error) => console.log('AsyncStorage:' + error.message))
    }
    save() {
        var x1 = parseInt(this.state.score[0], 10) + parseInt(this.state.score1, 10);
        var x2 = parseInt(this.state.score[1], 10) + parseInt(this.state.score2, 10);
        var x3 = parseInt(this.state.score[2], 10) + parseInt(this.state.score3, 10);
        var x4 = parseInt(this.state.score[3], 10) + parseInt(this.state.score4, 10);
        
        AsyncStorage.setItem(STORAGE_KEY1, x1 + "")
            .then(() => console.log('saved ' + this.state.score[0]))
            .catch((error) => console.log(error.message)).done();
        AsyncStorage.setItem(STORAGE_KEY2, x2 + "")
            .then(() => console.log('saved ' + this.state.score[1]))
            .catch((error) => console.log(error.message)).done();
        AsyncStorage.setItem(STORAGE_KEY3, x3 + "")
            .then(() => console.log('saved ' + this.state.score[2]))
            .catch((error) => console.log(error.message)).done();
        AsyncStorage.setItem(STORAGE_KEY4, x4 + "")
            .then(() => console.log('saved ' + this.state.score[3]))
            .catch((error) => console.log(error.message)).done();
    }
    _select(binNumber) {
        if (this.state.bin[binNumber]) {
            scoreNew = this.state.score
            scoreNew[binNumber] += 1
            this.setState({
                score: scoreNew,
            })
            Alert.alert(strings.alert1,
                strings.alert2,
                [
                    { text: strings.alert3, onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false })
            this._randomWaste()
        } else {
            Alert.alert(strings.alert4,
                strings.alert5,
                [
                    { text: strings.alert3, onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false })
        }
    }
    _stop() {
        Alert.alert(strings.playingAlert1
            , strings.binType1 + " " + this.state.score[0] + '\n' + strings.binType2 + " " + this.state.score[1]
            + '\n' + strings.binType3 + " " + this.state.score[2] + '\n' + strings.binType4 + " " + this.state.score[3]
        )
        this.setState({
            playing: false,
            score: scoreNew,
        })
        this.save()
    }
    _changeBut() {
        if (this.state.imgShow === 0) {
            this.setState({
                bin: [true, false, false, false],

            })
        }
        if (this.state.imgShow === 1) {
            this.setState({
                bin: [true, false, false, false],

            })
        } if (this.state.imgShow === 2) {
            this.setState({
                bin: [false, false, false, true],

            })
        } if (this.state.imgShow === 3) {
            this.setState({
                bin: [false, false, false, true],

            })
        } if (this.state.imgShow === 4) {
            this.setState({
                bin: [true, false, true, false],

            })
        } if (this.state.imgShow === 5) {
            this.setState({
                bin: [true, false, true, false],

            })
        } if (this.state.imgShow === 6) {
            this.setState({
                bin: [false, true, false, false],

            })
        } if (this.state.imgShow === 7) {
            this.setState({
                bin: [false, true, false, false],

            })
        } if (this.state.imgShow === 8) {
            this.setState({
                bin: [false, false, false, true],

            })
        } if (this.state.imgShow === 9) {
            this.setState({
                bin: [false, false, false, true],

            })
        } if (this.state.imgShow === 10) {
            this.setState({
                bin: [true, false, false, false],

            })
        } if (this.state.imgShow === 11) {
            this.setState({
                bin: [true, false, true, false],

            })
        } if (this.state.imgShow === 12) {
            this.setState({
                bin: [true, false, true, false],

            })
        } if (this.state.imgShow === 13) {
            this.setState({
                bin: [true, false, false, false],

            })
        } if (this.state.imgShow === 14) {
            this.setState({
                bin: [true, false, false, false],

            })
        } if (this.state.imgShow === 15) {
            this.setState({
                bin: [true, false, true, false],

            })
        } if (this.state.imgShow === 16) {
            this.setState({
                bin: [true, false, true, false],

            })
        } if (this.state.imgShow === 17) {
            this.setState({
                bin: [true, false, true, false],

            })
        } if (this.state.imgShow === 18) {
            this.setState({
                bin: [true, false, false, false],

            })
        } if (this.state.imgShow === 19) {
            this.setState({
                bin: [true, false, true, false],

            })
        } if (this.state.imgShow === 20) {
            this.setState({
                bin: [true, false, false, false],

            })
        } if (this.state.imgShow === 21) {
            this.setState({
                bin: [false, false, true, false],

            })
        } if (this.state.imgShow === 22) {
            this.setState({
                bin: [false, false, false, true],

            })
        } if (this.state.imgShow === 23) {
            this.setState({
                bin: [false, false, false, true],

            })
        } if (this.state.imgShow === 24) {
            this.setState({
                bin: [false, false, false, true],

            })
        } if (this.state.imgShow === 25) {
            this.setState({
                bin: [false, false, false, true],

            })
        } if (this.state.imgShow === 26) {
            this.setState({
                bin: [false, false, false, true],

            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.scoreRow}>
                    <View style={styles.stop}>
                        <Button title={strings.playingButton1} color="red" onPress={() => this._stop()} />
                    </View>
                </View>
                <View style={styles.containt}>
                    <View style={styles.waste}>
                        <Image style={{ width: 200, height: 200, resizeMode: 'contain' }}
                            source={this._showPic()} />
                        <Text style={styles.wasteName}>{this.state.imgName[this.state.imgShow]}</Text>
                    </View>
                    <View style={styles.buttonR}>
                        <Button title='🔃' color='grey' onPress={() => this._randomWaste()} />
                    </View>
                </View>
                <View style={styles.bin}>
                    <View style={styles.binType1}>
                        <Text style={styles.binName}>{strings.binType1}</Text>
                        <View style={styles._buttonP}>
                            <Text style={{ color: 'white' }}>{this.state.score[0]}</Text>
                            <Image style={{ width: 75, height: 75, resizeMode: 'contain' }} source={this.state.binImg[0]} />
                            <Button title={strings.playingButton2} color='teal'
                                onPress={() => this._select(0)}
                                disabled={this.state.playing === false} />
                        </View>
                    </View>
                    <View style={styles.binType2}>
                        <Text style={styles.binName}>{strings.binType2}</Text>
                        <View style={styles._buttonP}>
                            <Text style={{ color: 'white' }}>{this.state.score[1]}</Text>
                            <Image style={{ width: 75, height: 75, resizeMode: 'contain' }} source={this.state.binImg[1]} />
                            <Button title={strings.playingButton2} color='teal'
                                onPress={() => this._select(1)}
                                disabled={this.state.playing === false} />
                        </View>
                    </View>
                    <View style={styles.binType3}>
                        <Text style={styles.binName}>{strings.binType3}</Text>
                        <View style={styles._buttonP}>
                            <Text style={{ color: 'white' }}>{this.state.score[2]}</Text>
                            <Image style={{ width: 75, height: 75, resizeMode: 'contain' }} source={this.state.binImg[2]} />
                            <Button title={strings.playingButton2} color='teal'
                                onPress={() => this._select(2)}
                                disabled={this.state.playing === false} />
                        </View>
                    </View>
                    <View style={styles.binType4}>
                        <Text style={styles.binName}>{strings.binType4}</Text>
                        <View style={styles._buttonP}>
                            <Text style={{ color: 'white' }}>{this.state.score[3]}</Text>
                            <Image style={{ width: 75, height: 75, resizeMode: 'contain' }} source={this.state.binImg[3]} />
                            <Button title={strings.playingButton2} color='teal'
                                onPress={() => this._select(3)}
                                disabled={this.state.playing === false} />
                        </View>
                    </View>
                </View>
            </View >

        );
    }
}
class tutorial extends Component {
    static navigationOptions = {
        title: '',
    };
    constructor() {
        super();
        this.state = {

        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles._headT}>{strings.tutorial}</Text>
                <View style={styles.storyBox}>
                    <View style={styles.containBox}>
                        <View style={styles.story}>
                            <Text style={styles.highlight}>{strings.binType1}</Text>
                            <Text>{strings.GWDetail}</Text>
                        </View>
                        <View style={styles.picRow}>
                            <Image style={{ width: 65, resizeMode: 'contain' }} source={require('./img/bin.png')} />
                        </View>
                    </View>
                    <View style={styles.containBox}>
                        <View style={styles.story}>
                            <Text style={styles.highlight}>{strings.binType2}</Text>
                            <Text>{strings.CWDetail}</Text>
                        </View>
                        <View style={styles.picRow}>
                            <Image style={{ width: 65, resizeMode: 'contain' }} source={require('./img/bin2.png')} />

                        </View>
                    </View>
                    <View style={styles.containBox}>
                        <View style={styles.story}>
                            <Text style={styles.highlight}>{strings.binType3}</Text>
                            <Text>{strings.RWDetail}</Text>
                        </View>
                        <View style={styles.picRow}>
                            <Image style={{ width: 65, resizeMode: 'contain' }} source={require('./img/bin3.png')} />
                        </View>
                    </View>
                    <View style={styles.containBox}>
                        <View style={styles.story}>
                            <Text style={styles.highlight}>{strings.binType4}</Text>
                            <Text>{strings.HWDetail}</Text>
                        </View>
                        <View style={styles.picRow}>
                            <Image style={{ width: 65, resizeMode: 'contain' }} source={require('./img/bin4.png')} />
                        </View>
                    </View>
                </View>
            </View>

        );
    }
}
class statistic extends Component {
    static navigationOptions = {
        title: '',
    };

    constructor() {
        super();
        this._stat();
        this.state = {
            teamId: 6,
            secretKey: 'e7P5wa',
            score1: 0,
            score2: 0,
            score3: 0,
            score4: 0
        }
    }
    componentDidMount() {
        AsyncStorage.getItem(STORAGE_KEY1)
            .then((value) => {
                this.setState({
                    score1: (value == null) ? 0 : parseInt(value, 10),
                })
                console.log('show' + value)
            }).catch((error) => console.log('AsyncStorage:' + error.message))
        AsyncStorage.getItem(STORAGE_KEY2)
            .then((value) => {
                this.setState({
                    score2: (value == null) ? 0 : parseInt(value, 10),
                })
                console.log('show' + value)
            }).catch((error) => console.log('AsyncStorage:' + error.message))
        AsyncStorage.getItem(STORAGE_KEY3)
            .then((value) => {
                this.setState({
                    score3: (value == null) ? 0 : parseInt(value, 10),
                })
                console.log('show' + value)
            }).catch((error) => console.log('AsyncStorage:' + error.message))
        AsyncStorage.getItem(STORAGE_KEY4)
            .then((value) => {
                this.setState({
                    score4: (value == null) ? 0 : parseInt(value, 10),
                })
                console.log('show' + value)
            }).catch((error) => console.log('AsyncStorage:' + error.message))
    }
    _stat() {
        fetch('http://smartbin.devfunction.com/api/?team_id=6&secret=e7P5wa')
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON);
                this.setState({
                    general: JSON.parse(responseJSON.data.bin_statistics.general),
                    compostable: JSON.parse(responseJSON.data.bin_statistics.compostable),
                    recycle: JSON.parse(responseJSON.data.bin_statistics.recycle),
                    hazardous: JSON.parse(responseJSON.data.bin_statistics.hazardous),
                });
                console.log(this.state.waste);
            })
            .catch((error) => {
                console.warn(error);
            }); fetch
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles._headS}>{strings.allstat}</Text>
                <View style={styles.containtS}>
                    <View style={styles.textContaint}>
                        <View style={styles.containtss}>
                            <Text style={styles.headRow}>{strings.binType1}</Text>
                        </View>
                        <View style={styles.containtsss}>
                            <Text style={styles.containtFont}>{this.state.general}</Text>
                        </View>
                    </View>
                    <View style={styles.textContaint}>
                        <View style={styles.containtss}>
                            <Text style={styles.headRow}>{strings.binType2}</Text>
                        </View>
                        <View style={styles.containtsss}>
                            <Text style={styles.containtFont}>{this.state.compostable}</Text>
                        </View>
                    </View>
                    <View style={styles.textContaint}>
                        <View style={styles.containtss}>
                            <Text style={styles.headRow}>{strings.binType3}</Text>
                        </View>
                        <View style={styles.containtsss}>
                            <Text style={styles.containtFont}>{this.state.recycle}</Text>
                        </View>
                    </View>
                    <View style={styles.textContaint}>
                        <View style={styles.containtss}>
                            <Text style={styles.headRow}>{strings.binType4}</Text>
                        </View>
                        <View style={styles.containtsss}>
                            <Text style={styles.containtFont}>{this.state.hazardous}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles._headS}>{strings.gamestat}</Text>
                <View style={styles.containtS}>
                    <View style={styles.textContaint}>
                        <View style={styles.containtss}>
                            <Text style={styles.headRow}>{strings.binType1}</Text>
                        </View>
                        <View style={styles.containtsss}>
                            <Text style={styles.containtFont}>{this.state.score1}</Text>
                        </View>
                    </View>
                    <View style={styles.textContaint}>
                        <View style={styles.containtss}>
                            <Text style={styles.headRow}>{strings.binType2}</Text>
                        </View>
                        <View style={styles.containtsss}>
                            <Text style={styles.containtFont}>{this.state.score2}</Text>
                        </View>
                    </View>
                    <View style={styles.textContaint}>
                        <View style={styles.containtss}>
                            <Text style={styles.headRow}>{strings.binType3}</Text>
                        </View>
                        <View style={styles.containtsss}>
                            <Text style={styles.containtFont}>{this.state.score3}</Text>
                        </View>
                    </View>
                    <View style={styles.textContaint}>
                        <View style={styles.containtss}>
                            <Text style={styles.headRow}>{strings.binType4}</Text>
                        </View>
                        <View style={styles.containtsss}>
                            <Text style={styles.containtFont}>{this.state.score4}</Text>
                        </View>
                    </View>
                </View>
            </View>

        );
    }
}
const Garbage = StackNavigator({
    Home: { screen: gbproject },
    Play: { screen: playing },
    Tutorial: { screen: tutorial },
    Statistic: { screen: statistic },
});

export default Garbage;