class CreateLeaveAccrualQueues < ActiveRecord::Migration[6.1]
  def change
    create_table :leave_accrual_queues do |t|
      t.integer :employeeid
      t.date :dateeffective
      t.float :valuetoadd
      t.integer :leavetypeid
      t.integer :year
      t.boolean :posted
      t.integer :accrualtypeid
      t.integer :referenceid

      t.timestamps
    end
  end
end
