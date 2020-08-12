/**
 * Тестовые данные для заполнения игрового поля.
 * @type {*[
 *     {
 *        visible - нужно ли отрысовывать игровую ячейку. false - создаст пустую ячейку на игровом поле (todo: реализовать).
 *        needMove - требуется ли перемещать фишку из данной ячейки. (Сейчас не используется. Возможно скоро пересмотрю его назначение)
 *        moveOf - массив позможных вариатов для перемещания ячеек на игровок поле. Подобное решение, позволит создавать уровни любой формы.
 *     }
 * ]}
 */
export const boardForm = [
    [{visible: true, needMove: true, moveOf: []}, {visible: true, needMove: true, moveOf: []}, {visible: true, needMove: true, moveOf: []}, {visible: true, needMove: true, moveOf: []}, {visible: true, needMove: true, moveOf: []}],
    [{visible: true, needMove: true, moveOf: [{i: 0, j: 0}]}, {visible: true, needMove: true, moveOf: [{i: 0, j: 1}]}, {visible: true, needMove: true, moveOf: [{i: 0, j: 2}]}, {visible: true, needMove: true, moveOf: [{i: 0, j: 3}]}, {visible: true, needMove: true, moveOf: [{i: 0, j: 4}]}],
    [{visible: true, needMove: true, moveOf: [{i: 1, j: 0}]}, {visible: true, needMove: true, moveOf: [{i: 1, j: 1}]}, {visible: true, needMove: true, moveOf: [{i: 1, j: 2}]}, {visible: true, needMove: true, moveOf: [{i: 1, j: 3}]}, {visible: true, needMove: true, moveOf: [{i: 1, j: 4}]}],
    [{visible: true, needMove: true, moveOf: [{i: 2, j: 0}]}, {visible: true, needMove: true, moveOf: [{i: 2, j: 1}]}, {visible: true, needMove: true, moveOf: [{i: 2, j: 2}]}, {visible: true, needMove: true, moveOf: [{i: 2, j: 3}]}, {visible: true, needMove: true, moveOf: [{i: 2, j: 4}]}],
    [{visible: true, needMove: false, moveOf: [{i: 3, j: 0}]}, {visible: true, needMove: false, moveOf: [{i: 3, j: 1}]}, {visible: true, needMove: false, moveOf: [{i: 3, j: 2}]}, {visible: true, needMove: false, moveOf: [{i: 3, j: 3}]}, {visible: true, needMove: false, moveOf: [{i: 3, j: 4}]}]
];
