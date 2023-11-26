import {ThemeBuildConfig} from "@dreipol/t3-react-theme";

export const theme: ThemeBuildConfig = {
    colors:{
        surface: {
            // main: "#333"
        },
        palettes: {
            primary: {
                superLight:'#dae2e5',
                veryLight:'#b5c4cc',
                light:'#90a7b2',
                main:'#6b8998',
                dark:'#516874',
                contrast:'#fff'
            },

            tertiary: {
                superLight:'#c4c4c4',
                veryLight:'#868686',
                light:'#4d4d4d',
                main:'#333333',
                dark:'#1a1a1a',
                contrast:'#fff'
            },
            secondary: {
                superLight:'#b8d5ff',
                veryLight:'#71abff',
                light:'#2a81ff',
                main:'#005ce1',
                dark:'#0045a8',
                contrast:'#fff'
            },
        },
        text: {
            primary:'#333',
            secondary: '#454545'
        }
    },
    font: {
        mainHeading: {
            size: '56px'
        },
        eventHeading: {
            size: '24px'
        },
        headingLarge: {
            size: '36px'
        }
    }
}