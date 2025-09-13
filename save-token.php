<?php
// قراءة البيانات المرسلة بصيغة JSON
$data = json_decode(file_get_contents('php://input'), true);
$token = $data['token'] ?? '';

if ($token) {
    // حاول حفظ التوكن في الملف
    try {
        file_put_contents('tokens.txt', $token . PHP_EOL, FILE_APPEND | LOCK_EX);
        // الرد للموقع بأن العملية ناجحة
        echo json_encode(['status' => 'success', 'message' => 'تم تفعيل الإشعارات بنجاح!']);
    } catch (Exception $e) {
        // إذا حصل خطأ أثناء الكتابة
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'فشل حفظ التوكن']);
    }
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'لم يتم استلام توكن']);
}
?>
