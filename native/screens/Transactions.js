import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TouchableOpacityComponent } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../core/theme';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../store/actions/acountActions';

const { width } = Dimensions.get('window');
const tabWidth = width / 4;

/* * * * * * * * * * * * * * * * *
 * Renderiza todas las tabs      *
 * * * * * * * * * * * * * * * * */
const Tabs = ({ children }) => {
    return <View style={styles.tabs}>{children}</View>;
};

/* * * * * * * * * * * * * * * * *
 * Renderiza una sola tab        *
 * * * * * * * * * * * * * * * * */
const Tab = ({ title, active }) => {
    return (
        <View style={[styles.tab, active ? styles.activeTab : {}]}>
            <Text style={styles.tabText}>{title}</Text>
        </View>
    );
};

export default function Transactions({navigation}) {

    const dispatch = useDispatch();
    const session = useSelector((state) => state.session.userDetail);
    const cvuPesos = {} || session.accounts[0].cvu;
    const cvuDollars = {} || session.accounts[1].cvu || '';
    const transactions = useSelector((state) => state.acoount.transactions) || ['jaja'];

    console.log(transactions[0]);

    const [tabState, setTabState] = useState({
        all: true,
        first: false,
        second: false,
        custom: false,
    });

    const pressedTab = (key) => {
        if (key === 'A') {
            setTabState({ all: true, first: false, second: false, custom: false });
        } else if (key === 'B') {
            setTabState({ all: false, first: true, second: false, custom: false });
        } else if (key === 'C') {
            setTabState({ all: false, first: false, second: true, custom: false });
        }
        else {
            setTabState({ all: false, first: false, second: false, custom: true });
        }
    };

    useEffect(() => {
        let x = session.accounts[0].cvu
        dispatch(getTransactions(x));
        //dispatch(getTransactions(cvuDollars));
    }, []);

    return (

        <View>

            <View style={styles.header}>
                <Image source={require('../assets/background2.png')} style={{ position: 'absolute' }} />

                <View style={styles.rowI}>
                    <Icon name="exchange" color={'white'} size={30} />
                    <Text style={styles.title}> Transacciones realizadas</Text>
                </View>

                <Text style={styles.instruction}> Elige el periodo que deseas consultar </Text>
            </View>

            <Tabs>
                <TouchableOpacity style={styles.rowII} onPress={() => pressedTab('A')}>
                    <Tab title='Todas' active={tabState.all} icon_name={'user'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.rowII} onPress={() => pressedTab('B')}>
                    <Tab title='15 días' active={tabState.first} icon_name={'check-circle'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.rowII} onPress={() => pressedTab('C')}>
                    <Tab title='30 días' active={tabState.second} icon_name={'question-circle'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.rowII} onPress={() => pressedTab('D')}>
                    <Tab title='filtrar' active={tabState.custom} icon_name={'question-circle'} />
                </TouchableOpacity>
            </Tabs>

            <ScrollView>
                <View style={{ marginBottom: 250 }}>
                    {
                        transactions.length > 0 && transactions.map((transaction, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => navigation.navigate('TransactionDetails', transaction )}>

                                <View style={styles.itemContainer}>
                                    <View style={styles.item}>
                                        <Text style={styles.firstItem}>{transaction.by}</Text>
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={styles.itemtext}>{transaction.amount}</Text>
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={styles.itemtext}>{transaction.fromAccount[0].type}</Text>
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={styles.itemtext}>{transaction.date.substring(0, 10)}</Text>
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={styles.itemtext}>{transaction.date.substring(12, 16)}</Text>
                                    </View>
                                    <Icon name={'angle-right'} color={theme.colors.primary} size={15} />
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>

        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        //backgroundColor: theme.colors.primary,
        paddingLeft: 15
    },
    rowI: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 25,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 5
    },
    instruction: {
        textAlign: 'center',
        fontSize: 12,
        color: 'white',
        paddingBottom: 20,
    },
    tabs: {
        height: 50,
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    tab: {
        height: 50,
        width: tabWidth,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    tabText: {
        fontWeight: 'bold',
        color: theme.colors.secondary,
        padding: 1,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.primary,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#f2f2f2',

    },
    item: {
        width: width / 6,
    },
    firstItem: {
        fontSize: 10,
    },
    itemtext: {
        fontSize: 10,
        textAlign: 'center'
    }
})