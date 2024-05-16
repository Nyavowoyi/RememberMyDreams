import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native'
import React, { PropsWithChildren, useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { Colors } from '@/constants/Colors'
import dayjs from 'dayjs';

const DreamCardItem = ({ onPress, dream }: any) => {

    console.info(dream);
    const formattedDay = dayjs(dream.date).format('DD');
    const formattedMonth = dayjs(dream.date).format('MMM');
    const formattedTime = dayjs(dream.date).format('h:mm a');
    const dreamTitle = dream.title;
    const dreamHour = dayjs(dream.date).hour();
    
    const iconName = ((dreamHour >= 0 && dreamHour < 7) || (dreamHour >= 18 && dreamHour <= 23)) ? 'moon' : 'sunny';

    const theme = useColorScheme() ?? 'light';

    return (
        <Pressable onPress={onPress}>
            <ThemedView style={styles.root}>

                <ThemedView style={styles.dateContainer}>
                    <ThemedText style={styles.date}>
                        {formattedDay}
                    </ThemedText>
                    <ThemedText style={styles.month}>
                        {formattedMonth}
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.middle}>
                    <ThemedView>
                        <ThemedText style={styles.time}>{formattedTime}</ThemedText>
                    </ThemedView>
                    <ThemedView>
                        <ThemedText style={styles.dream}>{dreamTitle}</ThemedText>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.image}>
                    <ThemedView>
                        <Ionicons name={iconName} size={32} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
                    </ThemedView>
                </ThemedView>

            </ThemedView>
        </Pressable>
    )
}

export default DreamCardItem

const styles = StyleSheet.create({
    root: {
        // opacity: 0.75,
        borderWidth: 1, 
        height: 100,
        borderColor: 'orange',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderRadius: 24,
        marginHorizontal: 16,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    dateContainer: {
        height: 60,
        width: '25%',
        justifyContent: 'space-between',
    },
    date: {
        fontSize: 22,
    },
    middle: {
        width: '50%',
        justifyContent: 'space-between',
        height: 60,
    },
    month: {
        fontSize: 22,
    },
    time: {
        fontSize: 14,
    },
    dream: {
        fontSize: 16,
    },
    image: {
        height: 50,
        justifyContent: 'center',
        width: '25%',
        alignItems: 'center',
    },
});