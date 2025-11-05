/**
 * remove_think_from_history.js
 * -----------------------------
 * Script สำหรับ SillyTavern ที่จะลบส่วน <think>...</think>
 * ออกจากข้อความของ AI ก่อนเก็บเข้าประวัติการสนทนา
 * เพื่อไม่ให้กิน token/context โดยไม่จำเป็น
 */

ST.registerHook('onMessageReceived', (data) => {
    try {
        // ตรวจว่าข้อความมีเนื้อหาเป็น string ก่อน
        if (data && typeof data.msg === 'string') {
            // ลบทุกส่วนที่อยู่ในแท็ก <think>...</think>
            data.msg = data.msg.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
        }

        // กรณีข้อความอยู่ใน data.output หรือ data.message
        if (data && data.output && typeof data.output === 'string') {
            data.output = data.output.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
        }

        if (data && data.message && typeof data.message === 'string') {
            data.message = data.message.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
        }

        return data;
    } catch (err) {
        console.error('[remove_think_from_history.js] Error:', err);
        return data;
    }
});
