# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

AccrualType.create([
    {
        name: 'Monthly Accrual',
        active: true,
    },{
        name: 'Yearly Credit',
        active: true
    },{
        name: 'Adjustment',
        active: true
    }
])

LeaveType.create([{
    name: 'Service Incentive Leave',
    ispaid: true,
    active: true,
}, {
    name: 'Maternity Leave',
    ispaid: true,
    active: true,
},{
    name: 'Paternity Leave',
    ispaid: true,
    active: true,
}, {
    name: 'Bereavement Leave',
ispaid: true,
active: true,
}, {
    name: 'Half-day Leave',
ispaid: true,
active: true,
},{
    name: 'Leave Without Pay',
ispaid: false,
active: true,
}


])

PaymentMode.create([
    {
        name: 'Weekly',
        active: true,
        useincutoffs: true
    },{
        name: 'Semi-monthly',
        active: true,
        useincutoffs: true
    },
    {
        name: 'blank',
        active: true,
        useincutoffs: false
    }
])

LeaveStatus.create([
    {
        name: 'Pending',
        active: true
    },
    {
        name: 'Approved',
        active: true
    },
    {
        name: 'Disapproved',
        active: true
    }
])