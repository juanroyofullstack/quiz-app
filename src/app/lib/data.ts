
export const data = () => {
    try {
        fetch('https://opentdb.com/api.php?amount=10').then((data: any) => {
            return data.json();
        }).then(data => {
            return data;
        });
    } catch(e) {
        console.error(e);
    }
};