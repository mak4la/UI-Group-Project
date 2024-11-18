import rateImage from './assets/rate_processed.png';
import organizeImage from './assets/organize.png';
import discoverImage from './assets/discover.png';

export const data = [
    {
        theme: {backgroundColor: "#d8f7e1", color: "black"},
    },
    {
        title: "Discover",
        paragraph: "What is your next read going to be?",
        theme: {backgroundColor: "#E5FC94", color: "black"},
        button: "Start Now",
        image: discoverImage
        // image: "assets/rate.png"
    },
    {
        title: "Organize",
        paragraph: "Create collections and keep track of your books",
        theme: {backgroundColor: "#B9FCFD", color: "black"},
        button: "Start Now" ,
        image: organizeImage
    },
    {
        title: "Rate & Review",
        paragraph: "Review and rate your favorite books!",
        theme: {backgroundColor: "#B3ECC4", color: "black"},
        button: "Start Now",
        image: rateImage
        
        
    }
]