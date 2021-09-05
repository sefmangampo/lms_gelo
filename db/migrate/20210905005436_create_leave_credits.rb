class CreateLeaveCredits < ActiveRecord::Migration[6.1]
  def change
    create_table :leave_credits do |t|
      t.integer :employeeid
      t.integer :year
      t.float :credits

      t.timestamps
    end
  end
end
