import styles from 'styles/common/inventory/Manage.module.scss';

import NumberWidget from 'components/NumberWidget.component'

function ManageInventory() {
    return (
        <div className={styles.container}>
            <div className={styles.widgets}>
                <NumberWidget title="Total items 1" label="Item" value="1337"/>
                <NumberWidget title="Total items 2" label="Item" value="1337"/>
                <NumberWidget title="Total items 3" label="Item" value="1337"/>
                <NumberWidget title="Total items 4" label="Item" value="1337"/>
            </div>
            <table border="1">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Vendor</th>
                    <th>Unit price</th>
                    <th>Total sold</th>
                </tr>
                <tr>
                    <td>01</td>
                    <td>Test</td>
                    <td>Test vendor</td>
                    <td>1337</td>
                    <td>1337</td>
                </tr>
                <tr>
                    <td>01</td>
                    <td>Test</td>
                    <td>Test vendor</td>
                    <td>1337</td>
                    <td>1337</td>
                </tr>
                <tr>
                    <td>01</td>
                    <td>Test</td>
                    <td>Test vendor</td>
                    <td>1337</td>
                    <td>1337</td>
                </tr>
                <tr>
                    <td>01</td>
                    <td>Test</td>
                    <td>Test vendor</td>
                    <td>1337</td>
                    <td>1337</td>
                </tr>
            </table>
        </div>
    )
}

export default ManageInventory;