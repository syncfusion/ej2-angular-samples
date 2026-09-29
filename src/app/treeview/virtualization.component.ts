import { Component } from '@angular/core';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * TreeView Virtualization Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'virtualization.html',
    standalone: true,
    imports: [
        TreeViewModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent
    ]
})
export class VirtualizationTreeViewComponent {

    public field: Object;

    constructor() {

        const totalNodes: number = 8000;
        const employeesPerDept: number = 20;

        const departments: string[] = [
            'Engineering',
            'Sales',
            'Human Resources',
            'Finance',
            'Marketing',
            'Customer Support',
            'Operations',
            'Legal',
            'Research',
            'IT Infrastructure'
        ];

        const employeeRoles: string[] = [
            'Manager',
            'Senior Engineer',
            'Software Engineer',
            'Business Analyst',
            'QA Engineer',
            'Consultant',
            'Specialist',
            'Coordinator',
            'Executive',
            'Associate'
        ];

        const orgData: Object[] = this.generateOrganizationData(
            totalNodes,
            employeesPerDept,
            departments,
            employeeRoles
        );

        this.field = {
            dataSource: orgData,
            id: 'id',
            parentID: 'pid',
            text: 'name',
            hasChildren: 'hasChild',
            isChecked: 'isChecked',
            expanded: 'isExpanded'
        };
    }

    private generateOrganizationData(
        total: number,
        children: number,
        departments: string[],
        employeeRoles: string[]
    ): Object[] {

        const data: any[] = [];
        let index: number = 0;
        let id: number = 1;
        let deptIndex: number = 0;

        while (index < total) {

            const deptId = id++;
            const deptName = departments[deptIndex % departments.length];
            const parentIndex = index;

            data[index++] = {
                id: deptId,
                pid: null,
                name: deptName,
                hasChild: false,
                isChecked: true,
                isExpanded: false
            };

            let childCount = 0;

            for (let i = 0; i < children && index < total; i++) {

                const role = employeeRoles[i % employeeRoles.length];

                data[index++] = {
                    id: id++,
                    pid: deptId,
                    name: `${role} - Employee ${i + 1}`,
                    isChecked: true,
                    isExpanded: false
                };

                childCount++;
            }

            if (childCount > 0) {
                data[parentIndex].hasChild = true;
            }

            deptIndex++;
        }

        return data;
    }
}