/**
 * Тестовые данные для заполнения игрового поля.
 * @type {*[
 *     {
 *        visible - нужно ли отрысовывать игровую ячейку. false - создаст пустую ячейку на игровом поле. (На пустую ячейку не должно быть ссылок "moveOf")
 *        moveOf - массив позможных вариатов для перемещания ячеек на игровок поле. Подобное решение, должно дать возможность создавать уровни любой формы.
 *     }
 * ]}
 */
const boardForm1 = [
    [{visible: false, moveOf: []}, {visible: true, moveOf: []}, {visible: true, moveOf: []}, {visible: true, moveOf: []}, {visible: false, moveOf: []}],
    [{visible: true, moveOf: []}, {visible: true, moveOf: [{i: 0, j: 1}]}, {visible: true, moveOf: [{i: 0, j: 2}]}, {visible: true, moveOf: [{i: 0, j: 3}]}, {visible: true, moveOf: []}],
    [{visible: true, moveOf: [{i: 1, j: 0}]}, {visible: true, moveOf: [{i: 1, j: 1}]}, {visible: true, moveOf: [{i: 1, j: 2}]}, {visible: true, moveOf: [{i: 1, j: 3}]}, {visible: true, moveOf: [{i: 1, j: 4}]}],
    [{visible: true, moveOf: [{i: 2, j: 0}]}, {visible: true, moveOf: [{i: 2, j: 1}]}, {visible: true, moveOf: [{i: 2, j: 2}]}, {visible: true, moveOf: [{i: 2, j: 3}]}, {visible: true, moveOf: [{i: 2, j: 4}]}],
    [{visible: true, moveOf: [{i: 3, j: 0}]}, {visible: true, moveOf: [{i: 3, j: 1}]}, {visible: true, moveOf: [{i: 3, j: 2}]}, {visible: true, moveOf: [{i: 3, j: 3}]}, {visible: true, moveOf: [{i: 3, j: 4}]}]
];

const boardForm2 = [
    [{visible: true, moveOf: []}, {visible: true, moveOf: []}, {visible: true, moveOf: []}, {visible: false, moveOf: []}, {visible: false, moveOf: []}, {visible: false, moveOf: []}, {visible: true, moveOf: []}, {visible: true, moveOf: []}, {visible: true, moveOf: []}, {visible: false, moveOf: []}],
    [{visible: true, moveOf: [{i: 0, j: 0}]}, {visible: true, moveOf: [{i: 0, j: 1}]}, {visible: true, moveOf: [{i: 0, j: 2}]}, {visible: true, moveOf: []}, {visible: true, moveOf: []}, {visible: true, moveOf: []}, {visible: true, moveOf: [{i: 0, j: 6}]}, {visible: true, moveOf: [{i: 0, j: 7}]}, {visible: true, moveOf: [{i: 0, j: 8}]}, {visible: true, moveOf: []}],
    [{visible: true, moveOf: [{i: 1, j: 0}]}, {visible: true, moveOf: [{i: 1, j: 1}]}, {visible: true, moveOf: [{i: 1, j: 2}]}, {visible: true, moveOf: [{i: 1, j: 3}]}, {visible: true, moveOf: [{i: 1, j: 4}]}, {visible: true, moveOf: [{i: 1, j: 5}]}, {visible: true, moveOf: [{i: 1, j: 6}]}, {visible: true, moveOf: [{i: 1, j: 7}]}, {visible: true, moveOf: [{i: 1, j: 8}]}, {visible: true, moveOf: []}],
    [{visible: true, moveOf: [{i: 2, j: 0}]}, {visible: true, moveOf: [{i: 2, j: 1}]}, {visible: true, moveOf: [{i: 2, j: 2}]}, {visible: true, moveOf: [{i: 2, j: 3}]}, {visible: true, moveOf: [{i: 2, j: 4}]}, {visible: true, moveOf: [{i: 2, j: 5}]}, {visible: true, moveOf: [{i: 2, j: 6}]}, {visible: true, moveOf: [{i: 2, j: 7}]}, {visible: true, moveOf: [{i: 2, j: 8}]}, {visible: true, moveOf: []}],
    [{visible: true, moveOf: [{i: 3, j: 0}]}, {visible: true, moveOf: [{i: 3, j: 1}]}, {visible: true, moveOf: [{i: 3, j: 2}]}, {visible: true, moveOf: [{i: 3, j: 3}]}, {visible: true, moveOf: [{i: 3, j: 4}]}, {visible: true, moveOf: [{i: 3, j: 5}]}, {visible: true, moveOf: [{i: 3, j: 6}]}, {visible: true, moveOf: [{i: 3, j: 7}]}, {visible: true, moveOf: [{i: 3, j: 8}]}, {visible: true, moveOf: []}],
    [{visible: true, moveOf: [{i: 4, j: 0}]}, {visible: true, moveOf: [{i: 4, j: 1}]}, {visible: true, moveOf: [{i: 4, j: 2}]}, {visible: true, moveOf: [{i: 4, j: 3}]}, {visible: true, moveOf: [{i: 4, j: 4}]}, {visible: true, moveOf: [{i: 4, j: 5}]}, {visible: true, moveOf: [{i: 4, j: 6}]}, {visible: true, moveOf: [{i: 4, j: 7}]}, {visible: true, moveOf: [{i: 4, j: 8}]}, {visible: true, moveOf: []}],
    [{visible: true, moveOf: [{i: 5, j: 0}]}, {visible: true, moveOf: [{i: 5, j: 1}]}, {visible: true, moveOf: [{i: 5, j: 2}]}, {visible: true, moveOf: [{i: 5, j: 3}]}, {visible: true, moveOf: [{i: 5, j: 4}]}, {visible: true, moveOf: [{i: 5, j: 5}]}, {visible: true, moveOf: [{i: 5, j: 6}]}, {visible: true, moveOf: [{i: 5, j: 7}]}, {visible: true, moveOf: [{i: 5, j: 8}]}, {visible: true, moveOf: []}],
    [{visible: true, moveOf: [{i: 6, j: 0}]}, {visible: true, moveOf: [{i: 6, j: 1}]}, {visible: true, moveOf: [{i: 6, j: 2}]}, {visible: true, moveOf: [{i: 6, j: 3}]}, {visible: true, moveOf: [{i: 6, j: 4}]}, {visible: true, moveOf: [{i: 6, j: 5}]}, {visible: true, moveOf: [{i: 6, j: 6}]}, {visible: true, moveOf: [{i: 6, j: 7}]}, {visible: true, moveOf: [{i: 6, j: 8}]}, {visible: true, moveOf: []}]
];

export const dataLevels = [
    {
        width: 5,
        height: 5,
        scale: 1,
        boardForm: boardForm1
    },
    {
        width: 9,//10,
        height: 8,//8,
        scale: 0.55,
        boardForm: boardForm2
    }
];
