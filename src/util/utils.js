/**
 * Validates the form fields and sets error messages if validation fails.
 * @returns {boolean} - Returns true if validation passes, otherwise false.
 */
export function validateForm(data) {
    data.nameErrors = [];
    data.statusErrors = [];
    data.specificationErrors = [];
    data.infoErrors = [];


    if (!data.name) data.nameErrors.push("Name is required.");
    if (data.name.length > 50) data.nameErrors.push("Name is too long.");

    if (!data.status || (data.status !== "Active" && data.status !== "Inactive")) {
        data.statusErrors.push("Status is invalid.");
    }

    if (!data.specification) data.specificationErrors.push("Specification is required.");
    if (data.info.length > 100) data.specificationErrors.push("Specification is too long.");

    if (!data.info) data.infoErrors.push("Info is required.");
    if (data.info.length > 100) data.infoErrors.push("Info is too long.");

    return !(data.nameErrors.length || data.infoErrors.length || data.statusErrors.length || data.specificationErrors.length);
}

// export async function saveRobot(robotData, actionAddRobot, resetFormData, actionHandleIsAdding) {
//     try {
//         await actionAddRobot(robotData);
//         resetFormData();
//         actionHandleIsAdding(false)
//     } catch (error) {
//         console.log(error)
//         // nameErrors.push("Something went wrong while adding the robot.");
//         actionHandleIsAdding(false)
//     }
// }