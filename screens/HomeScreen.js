import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';

const polarToCartesian = (cx, cy, r, angle) => {
    const rad = (Math.PI * (angle - 90)) / 180.0;
    return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad),
    };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    const d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    ].join(' ');
    return d;
};

const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const newValue = Math.floor(Math.random() * 100);
            setData((prevData) => {
                const updatedData = [...prevData, newValue];
                return updatedData.length > 10 ? updatedData.slice(-10) : updatedData;
            });
            setValue(newValue);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    let status;
    if (value < 30) {
        status = 'Normal';
    } else if (value >= 30 && value <= 70) {
        status = 'Warning';
    } else {
        status = 'Danger';
    }

    const statusColor = status === 'Normal' ? '#E15B5B' : status === 'Warning' ? '#C92F62' : '#D5455E';

    const radius = 40;
    const strokeWidth = 10;
    const maxAngle = 252;
    const arcLength = (value / 100) * maxAngle;

    return (
        <View style={styles.container}>
            {/* Back Button and Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
                    <Icon name="chevron-back" size={30} color="#C92F62" />
                </TouchableOpacity>
            </View>

            <View style={styles.flexiWrapper}>

                {/* CONTROLLER */}
                <View style={{width: '50vw', borderRadius: 20, alignItems: 'center', flexDirection: 'column'}}>
                     {/* FORWARD */}
                    <TouchableOpacity style={[styles.progressContainer, {marginBottom: -15}]} onPress={() => {}}>
                        <Image
                            source={require('../img/up.png')}
                        />
                    </TouchableOpacity>

                    <View style={{width: '50vw', flexDirection: 'row'}}>
                        {/* LEFT */}
                        <TouchableOpacity style={[styles.progressContainer, {marginRight: -15}]} onPress={() => {}}>
                            <Image
                                source={require('../img/left.png')}
                            />
                        </TouchableOpacity>

                        <View style={[styles.progressContainer, { borderRadius: 0, padding: 30}]}>
                            <Image
                                source={require('../img/circle.png')}
                            />
                        </View>

                        {/* RIGHT */}
                        <TouchableOpacity style={[styles.progressContainer, {marginLeft: -15}]} onPress={() => {}}>
                            <Image
                                source={require('../img/right.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* BACKWARD */}
                    <TouchableOpacity style={[styles.progressContainer, {marginTop: -15}]} onPress={() => {}}>
                        <Image
                            source={require('../img/down.png')}
                        />
                    </TouchableOpacity>
                </View>



                <View style={styles.flexiContainer}>
                    <View style={styles.wrapper}>
                        <Image
                            source={require('../img/group-logo.png')}
                        />

                        {/* Button to connect to bluetooth */}
                        <TouchableOpacity style={[styles.progressContainer, {flexDirection: 'row', gap: 10, width: 140, paddingHorizontal: 30}]}>
                            <Text style={[styles.description, { fontSize: 15}]}>Connect to Bluetooth
                            </Text>
                            <Image
                                source={require('../img/bluetooth.png')}
                            />
                        </TouchableOpacity>
                        <View style={styles.progressContainer}>
                            <Image
                                source={require('../img/fire-disabled.png')}
                            />
                        </View>
                    </View>

                    <View style={styles.wrapper}>

                    {/* MQ2 Gas Analytics Progress and Status */}
                    <View style={styles.progressContainer}>
                        <Svg height="120" width="120" viewBox="0 0 100 100">
                            <Path
                                d={describeArc(50, 50, radius, -209, 150)}
                                stroke="#482935"
                                strokeWidth={strokeWidth}
                                fill="none"
                            />
                            <Path
                                d={describeArc(50, 50, radius, -208, -126 + arcLength)}
                                stroke={statusColor}
                                strokeWidth={strokeWidth}
                                fill="none"
                                strokeLinecap="round"
                            />
                        </Svg>
                        <Text style={[styles.description]}>MQ2 - {status}</Text>

                        <View style={styles.statusOverlay}>
                            <Text style={[styles.progressText, { color: statusColor }]}>{`${value}%`}</Text>
                        </View>
                    </View>

                    {/* MQ9 Gas Analytics Progress and Status */}
                    <View style={styles.progressContainer}>
                        <Svg height="120" width="120" viewBox="0 0 100 100">
                            <Path
                                d={describeArc(50, 50, radius, -209, 150)}
                                stroke="#482935"
                                strokeWidth={strokeWidth}
                                fill="none"
                            />

                            <Path
                                d={describeArc(50, 50, radius, -208, -126 + arcLength)} // Calculate arc based on value
                                stroke={statusColor}
                                strokeWidth={strokeWidth}
                                fill="none"
                                strokeLinecap="round"
                            />
                        </Svg>
                        <Text style={[styles.description]}>MQ9 - {status}</Text>
                        {/* Percentage inside circle */}
                        <View style={styles.statusOverlay}>
                            <Text style={[styles.progressText, { color: statusColor }]}>{`${value}%`}</Text>
                        </View>
                    </View>
                </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        paddingBottom: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D1D1F',
    },
    flexiWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1D1D1F',
        padding: 50,
        gap:20
    },
    flexiContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 330
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 23,
    },
    title: {
        fontSize: 18,
        flex: 1,
        marginRight: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    progressContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#28282A",
        padding: 15,
        borderRadius: 20
    },
    centerTextContainer: {
        position: 'absolute',
        top: '50%',
        left: '52%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
    },
    progressText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    statusOverlay: {
        position: 'absolute',
        top: '73%',
        left: '73%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
    },
    statusText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#686B6E"
    },
    chartBox: {
        backgroundColor: '#f0f4f8',
        bottom: '4%',
        width: '100%',
        paddingBottom: 190,
        marginTop: 20,
        borderRadius: 40,
        // iOS shadow properties
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        // Android elevation property
        elevation: 8,

    },
    chartContainer: {
        width: '100%',
        height: '25%',
        top: '120%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartStyle: {
        marginVertical: 8,
        borderRadius: 16,
    },
    chartLabel: {
        top: '20%',
        left: '10%',
        fontSize: 24,
        fontWeight: 'bold'
    }
});

export default HomeScreen;
