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

# Campaign.create([
#     {
#         name: 'Bacolod',
#         active: true
#     },
#     {
#         name: 'Batangas',
#         active: true
#     },
#     {
#         name: 'Bicol',
#         active: true
#     },
#     {
#         name: 'CDO',
#         active: true
#     },
#     {
#         name: 'Cebu',
#         active: true
#     },
#     {
#         name: 'Davao',
#         active: true
#     },
#     {
#         name: 'Gilmore',
#         active: true
#     },
#     {
#         name: 'Iloilo',
#         active: true
#     },
#     {
#         name: 'Main Office',
#         active: true
#     },
#     {
#         name: 'Palawan',
#         active: true
#     }, 
#     {
#         name: 'Tarlac',
#         active: true
#     }
# # ])

# jobststis.create([
#     {
#         name: 'Independent Contractor',
#         active: true
#     },
#     {
#         name: 'Probationary',
#         active: true
#     },
#     {
#         name: 'Project Based',
#         active: true
#     },
#     {
#         name: 'Regular',
#         active: true
#     }
# ])

# Position.create([
#     {
#        name: 'Account Associate',
#        active: true 
#     },
#     {
#         name: 'Accounting Assistant',
#         active: true 
#      },
#      {
#         name: 'Accounting Officer',
#         active: true 
#      },
#      {
#         name: 'Admin Callouts Buffer',
#         active: true 
#      },
#      {
#         name: 'Admin Staff',
#         active: true 
#      },
#      {
#         name: 'Admin Team Leader',
#         active: true 
#      },
#      {
#         name: 'Assistant Admin',
#         active: true 
#      },
#      {
#         name: 'Assistant Junior Analyst',
#         active: true 
#      },
#      {
#         name: 'Assistant Manager',
#         active: true 
#      },
#      {
#         name: 'Asst. Team Leader',
#         active: true 
#      },
#      {
#         name: 'Asst. Team Manager',
#         active: true 
#      },
#      {
#         name: 'Autoloan Driver',
#         active: true 
#      },
#      {
#         name: 'Account Rider',
#         active: true 
#      },
#      {
#         name: 'Branch Manager',
#         active: true 
#      },
#      {
#         name: 'Callouts Buffer',
#         active: true 
#      },
#      {
#         name: 'Consumer JA Buffer',
#         active: true 
#      },
#      {
#         name: 'Consumer Junior Analyst',
#         active: true 
#      },
#      {
#         name: 'Corporate Affairs & Communications Manager',
#         active: true 
#      },
#      {
#         name: 'Credit Associate',
#         active: true 
#      },
#      {
#         name: 'EG PMR',
#         active: true 
#      },
#      {
#         name: 'EG PMR GOA',
#         active: true 
#      },
#      {
#         name: 'Electrical Maintenance',
#         active: true 
#      },
#      {
#         name: 'Exclusive Driver',
#         active: true 
#      },
#      {
#         name: 'Field Admin',
#         active: true 
#      },
#      {
#         name: 'Field Credit Investigator',
#         active: true 
#      },
#      {
#         name: 'Account Associate',
#         active: true 
#      },
# ])