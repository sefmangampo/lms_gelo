class CreateEmployees < ActiveRecord::Migration[6.1]
  def change
    create_table :employees do |t|
      t.string :lastname
      t.string :firstname
      t.string :middlename
      t.integer :managerid
      t.integer :positionid
      t.integer :campaignid
      t.string :address
      t.integer :paygroupid
      t.integer :sexid
      t.date :dateofbirth
      t.date :dateanniverysary
      t.string :contactnumber
      t.date :datehired
      t.date :dateregular
      t.boolean :active
      t.string :remarks
      t.string :fullname
      t.string :idnumber
      t.integer :statusid
      t.integer :employmentstatusid
      t.integer :ombmtmid
      t.string :teamleader
      t.string :manager
      t.string :employeename
      t.string :suffix
      t.booean :hassuffix

      t.timestamps
    end
  end
end
