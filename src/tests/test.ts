var testID = 1;

export async function expect(message: string, callback: (() => boolean) | (() => Promise<boolean>)): Promise<void> {
    if(callback.constructor.name === 'AsyncFunction') {
        try {
            let success = await callback();
            success ? console.log(`✔️ Test ${testID} "${message}" passed`) : console.log(`❌ Test ${testID} "${message}" failed`);
        } catch(error) {
            console.log(`❌ Test ${testID} "${message}" failed: ${error}`);
        }

        testID++;
    } else {
        try {
            callback() ? console.log(`✔️ Test ${testID} "${message}" passed`) : console.log(`❌ Test ${testID} "${message}" failed`);
        } catch(error) {
            console.log(`❌ Test ${testID} "${message}" failed: ${error}`);
        }

        testID++;
    }
}