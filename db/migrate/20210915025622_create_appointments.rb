class CreateAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :appointments do |t|
      t.string :text
      t.datetime :startDate
      t.datetime :endDate
      t.boolean :allday
      t.string :description
      t.string :recurrenceRule
      t.boolean :iseditable
      t.boolean :isusermade
      t.integer :type

      t.timestamps
    end
  end
end
