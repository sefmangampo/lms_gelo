class CreateEmployeeCutOffGroupMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :employee_cut_off_group_members do |t|
      t.integer :cutoffgroupid
      t.integer :employeeid

      t.timestamps
    end
  end
end
