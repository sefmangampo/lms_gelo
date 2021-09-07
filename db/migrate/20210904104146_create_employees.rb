class CreateEmployees < ActiveRecord::Migration[6.1]
  def change
    create_table :employees do |t|
      t.string :lastname
      t.string :firstname
      t.string :middlename
      t.integer :managerid
      t.integer :positionid
      t.integer :campaignid
      t.date :datehired
      t.date :dateregular
      t.boolean :active

      t.timestamps
    end
  end
end
