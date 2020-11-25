import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Dimensions, Text, RefreshControl, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {getTransactionsPesos} from '../../store/actions/acountActions'
import Grafica from '../../components/graficas'
import Table from '../../components/tablas';
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";;


//Functions
function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

export default function EstadPesos() {
    const dispatch = useDispatch();
	const session = useSelector((state) => state.session.userDetail);
    const accounts = useSelector((state) => state.acoount.account);
    const transations = useSelector((state) => state.acoount.transactionsPesos);
	const accountP = accounts[0];
	const accountD = accounts[1];
	const cvuP = accountP && accountP.cvu;
    const cvuD = accountD && accountD.cvu;
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(getTransactionsPesos(cvuP)) 
        onRefresh()
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
    
        wait(1000).then(() => {
          setRefreshing(false);
          dispatch(getTransactionsPesos(cvuP));
        });
      }, [refreshing]);

    

    /****************************** Variables fechas ******************************** */
    var date = new Date(); 
    var dayCurrentMount = date.getDate()
    var dayOne = dayCurrentMount-7

    console.log(transations)
    let arrayFechCurrent = transations.map(element => {
        let dateSet = new Date( element.date )
        let day = dateSet.getDate()
        console.log(dayOne)
        if(day >= dayOne && day <= dayCurrentMount ){
          return  {...element, day : day}
        }
    });

    let arrayTrancIn = transations.map(element => {
      let dateSet = new Date( element.date )
      let day = dateSet.getDate()
      console.log(dayOne)
      if(day >= dayOne && day <= dayCurrentMount && element.type === 'In' ){
        return  {...element, day : day}
      }
    });

    let arrayTrancOut = transations.map(element => {
      let dateSet = new Date( element.date )
      let day = dateSet.getDate()
      console.log(dayOne)
      if(day >= dayOne && day <= dayCurrentMount && element.type === 'Out' ){
        return  {...element, day : day}
      }
    });

    let arrayFechCurrentTwo = arrayFechCurrent.filter(x => x !== undefined)
    let arrayTrancInSuccess = arrayTrancIn.filter(x => x !== undefined)
    let arrayTrancOutSuccess = arrayTrancOut.filter(x => x !== undefined)
    console.log('*****Array IN ****')
    console.log(arrayFechCurrentTwo)

    
    let daysAv = []
    for(let i = dayOne+1; i<=dayCurrentMount; i++){
      let day = dayOne
      daysAv.push(i)
    }

  /******************************************************************************************* */
                              /*Filtrar dias de los ultimos 7 dias*/
  /******************************************************************************************* */
    
      /*************Array por dia General****************** */
  let oneDay = arrayFechCurrentTwo.filter(x => x.day === daysAv[0])
  let twoDay = arrayFechCurrentTwo.filter(x => x.day === daysAv[1])
  let threeDay = arrayFechCurrentTwo.filter(x => x.day === daysAv[2])
  let fourDay = arrayFechCurrentTwo.filter(x => x.day === daysAv[3])
  let fiveDay = arrayFechCurrentTwo.filter(x => x.day === daysAv[4])
  let sixDay = arrayFechCurrentTwo.filter(x => x.day === daysAv[5])
  let sevenDay = arrayFechCurrentTwo.filter(x => x.day === daysAv[6])
  /*************Array por dia Ingresos****************** */
  let oneDayIn = arrayTrancInSuccess.filter(x => x.day === daysAv[0])
  let twoDayIn = arrayTrancInSuccess.filter(x => x.day === daysAv[1])
  let threeDayIn = arrayTrancInSuccess.filter(x => x.day === daysAv[2])
  let fourDayIn = arrayTrancInSuccess.filter(x => x.day === daysAv[3])
  let fiveDayIn = arrayTrancInSuccess.filter(x => x.day === daysAv[4])
  let sixDayIn = arrayTrancInSuccess.filter(x => x.day === daysAv[5])
  let sevenDayIn = arrayTrancInSuccess.filter(x => x.day === daysAv[6])
  /*************Array por dia Ingresos****************** */
  let oneDayOut = arrayTrancOutSuccess.filter(x => x.day === daysAv[0])
  let twoDayOut = arrayTrancOutSuccess.filter(x => x.day === daysAv[1])
  let threeDayOut = arrayTrancOutSuccess.filter(x => x.day === daysAv[2])
  let fourDayOut = arrayTrancOutSuccess.filter(x => x.day === daysAv[3])
  let fiveDayIOut = arrayTrancOutSuccess.filter(x => x.day === daysAv[4])
  let sixDayOut = arrayTrancOutSuccess.filter(x => x.day === daysAv[5])
  let sevenDayOut = arrayTrancOutSuccess.filter(x => x.day === daysAv[6])


  /******************************************************************************************* */
                              /*Calcular trancciones por dia*/
  /******************************************************************************************* */

  console.log(sixDayOut)
  // /*************Valor por dia General****************** */
  let vDayOne = oneDay.length < 1 ? 0 : oneDay.map((x) => x.amount).reduce((ac, x) =>  ac + x)
  let vDayTwo = twoDay.length < 1 ? 0 : twoDay.map((x) => x.amount).reduce((ac, x) =>  ac + x)
  let vDayThree = threeDay.length < 1 ? 0 : threeDay.map((x) => x.amount).reduce((ac, x) =>  ac + x)
  let vDayFour = fourDay.length < 1 ? 0 : fourDay.map((x) => x.amount).reduce((ac, x) =>  ac + x)
  let vDayFive = fiveDay.length < 1 ? 0 : fiveDay.map((x) => x.amount).reduce((ac, x) =>  ac + x)
  let vDaySix = sixDay.length < 1 ? 0 : sixDay.map((x) => x.amount).reduce((ac, x) =>  ac + x)
  let vDaySeven = sevenDay.length < 1 ? 0 : sevenDay.map((x) => x.amount).reduce((ac, x) =>  ac + x)
  
    // /*************Valor por dia Ingresos****************** */
    let vDayOneIn = oneDayIn.length < 1 ? 0 : oneDayIn.map((x) => x.amount).reduce((ac, x) =>  ac + x)
    let vDayTwoIn = twoDayIn.length < 1 ? 0 : twoDayIn.map((x) => x.amount).reduce((ac, x) =>  ac + x)
    let vDayThreeIn = threeDayIn.length < 1 ? 0 : threeDayIn.map((x) => x.amount).reduce((ac, x) =>  ac + x)
    let vDayFourIn = fourDayIn.length < 1 ? 0 : fourDayIn.map((x) => x.amount).reduce((ac, x) =>  ac + x)
    let vDayFiveIn = fiveDayIn.length < 1 ? 0 : fiveDayIn.map((x) => x.amount).reduce((ac, x) =>  ac + x)
    let vDaySixIn = sixDayIn.length < 1 ? 0 : sixDayIn.map((x) => x.amount).reduce((ac, x) =>  ac + x)
    let vDaySevenIn = sevenDayIn.length < 1 ? 0 : sevenDayIn.map((x) => x.amount).reduce((ac, x) =>  ac + x)
    // /*************Valor por dia Egresos****************** */
    let vDayOneOut = oneDayOut.length < 1 ? 0 : oneDayOut.map((x) => x.amount).reduce((ac, x) =>  ac + x)
    let vDayTwoOut = twoDayOut.length < 1 ? 0 : twoDayOut.map((x) => x.amount).reduce((ac, x) =>  ac + x)
    let vDayThreeOut = threeDayOut.length < 1 ? 0 : threeDayOut.map((x) => x.amount).reduce((ac, x) =>  ac + x)
    let vDayFourOut = fourDayOut.length < 1 ? 0 : fourDayOut.map((x) => x.amount).reduce((ac, x) =>  ac + x)
    let vDayFiveOut = fiveDayIOut.length < 1 ? 0 : fiveDayIOut.map((x) => x.amount).reduce((ac, x) =>  ac + x)
    let vDaySixOut = sixDayOut.length < 1 ? 0 : sixDayOut.map((x) => x.amount).reduce((ac, x) =>  ac + x)
    let vDaySevenOut = sevenDayOut.length < 1 ? 0 : sevenDayOut.map((x) => x.amount).reduce((ac, x) =>  ac + x)

  console.log(vDaySixOut)

  /***************************************Array para  eje y************************************************ */
  let arrayGen = [vDayOne/1000, vDayTwo/1000, vDayThree/1000, vDayFour/1000, vDayFive/1000, vDaySix/1000, vDaySeven/1000]
  let arrayIn = [vDayOneIn/1000, vDayTwoIn/1000, vDayThreeIn/1000, vDayFourIn/1000, vDayFiveIn/1000, vDaySixIn/1000, vDaySevenIn/1000]
  let arrayOut = [vDayOneOut/1000, vDayTwoOut/1000, vDayThreeOut/1000, vDayFourOut/1000, vDayFiveOut/1000, vDaySixOut/1000, vDaySevenOut/1000]

    

   

    return (
        <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
            <Grafica 
            text='Grafica general de transacciones en los ultimos 7 dias'
            data = {arrayGen}
            /> 
            <Table   
                arrayValues={arrayGen}
                arrayDay= {daysAv}   
            />
        </View>

        <View style={styles.container}>
        <Grafica 
          text='Grafica general de Ingresos en los ultimos 7 dias'
          data = {arrayIn}
        /> 
            <Table   
                arrayValues={arrayIn}
                arrayDay= {daysAv}   
            />
        </View>

        <View style={styles.container}>
            <Grafica 
            text='Grafica general de Egresos en los ultimos 7 dias'
            data = {arrayOut}
            /> 
            <Table   
                    arrayValues={arrayOut}
                    arrayDay= {daysAv}   
            />
        </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:"center",
      alignContent:'center',
      backgroundColor: "#fff",
      height:vh(90),
      margin:10,
      padding:10
    },


  });