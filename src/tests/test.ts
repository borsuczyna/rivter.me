var testID = 1;

export function expect(message: string, callback: () => boolean): void {
    try {
        let success = callback();
        if(success) {
            console.log(`✔️ Test ${testID} "${message}" passed`);
        } else {
            console.log(`❌ Test ${testID} "${message}" failed`);
        }
    } catch(error) {
        console.log(`❌ Test ${testID} "${message}" failed: ${error}`);
    }

    testID++;
}