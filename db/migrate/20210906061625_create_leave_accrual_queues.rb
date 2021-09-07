class CreateLeaveAccrualQueues < ActiveRecord::Migration[6.1]
  def change
    create_table :leave_accrual_queues do |t|
      t.integer :employeeid
      t.date :dateeffective
      t.float :valuetoadd
      t.integer :leavetypeid

      t.timestamps
    end
  end
end
