class CreateLeaveCredits < ActiveRecord::Migration[6.1]
  def change
    create_table :leave_credits do |t|
      t.integer :employeeid
      t.integer :year
      t.integer :leavetypeid
      t.float :credits

      t.timestamps
    end
  end
end
