# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
# #
# # Examples:
# #
# #   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
# #   Character.create(name: 'Luke', movie: movies.first)

# Sex.create([
#     {
#         name: 'Male',
#         active: true,
#         internal: true
#     },
#     {
#         name: 'Female',
#         active: true,
#         internal: true
#     },
#     {
#         name: 'Others',
#         active: true,
#         internal: true
#     }
# ])

# AccrualFrequency.create([
#     {
#        name: 'Monthly',
#        frequency: 1,
#        ismonthly: true
#     },
#     {
#         name: 'Yearly',
#         frequency: 1,
#         isyearly: true
#      },
#      {
#         name: 'Manual',
#         frequency: 0,
#         iscustom: true
#      }
# ])


# AccrualType.create([
#     {
#         name: 'Monthly Accrual',
#         active: true,
#         frequencyid: 1,
#         internal: true
#     },{
#         name: 'Yearly Credit',
#         active: true,
#         frequencyid: 2,
#         internal:true
#     },{
#         name: 'Adjustment',
#         active: true,
#         frequencyid: 3,
#         internal:true
#     }
# ])

# LeaveType.create([{
#     name: 'Service Incentive Leave',
#     ispaid: true,
#     active: true,
# }, {
#     name: 'Maternity Leave',
#     ispaid: true,
#     active: true,
# },{
#     name: 'Paternity Leave',
#     ispaid: true,
#     active: true,
# }, {
#     name: 'Bereavement Leave',
# ispaid: true,
# active: true,
# }, {
#     name: 'Half-day Leave',
# ispaid: true,
# active: true,
# },{
#     name: 'Leave Without Pay',
# ispaid: false,
# active: true,
# }


# ])

# PaymentMode.create([
#     {
#         name: 'Weekly',
#         active: true,
#         internal: true
#     },{
#         name: 'Semi-monthly',
#         active: true,
#         internal: true
#     },

# ])

# LeaveStatus.create([
#     {
#         name: 'Pending',
#         active: true,
#         internal: true
#     },
#     {
#         name: 'Approved',
#         active: true,
#         internal: true
#     },
#     {
#         name: 'Disapproved',
#         active: true,
#         internal: true
#     }
# ])