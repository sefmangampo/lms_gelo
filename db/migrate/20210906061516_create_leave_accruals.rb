class CreateLeaveAccruals < ActiveRecord::Migration[6.1]
  def change
    create_table :leave_accruals do |t|
      t.integer :employeeid
      t.date :dategiven
      t.float :valueadded
      t.integer :leaveaccrualtypeid
      t.string :remarks
      t.boolean :issystemgenerated
      t.integer :year
      t.integer :referenceid

      t.timestamps
    end
  end
end
