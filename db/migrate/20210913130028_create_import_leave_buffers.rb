class CreateImportLeaveBuffers < ActiveRecord::Migration[6.1]
  def change
    create_table :import_leave_buffers do |t|
      t.integer :empid
      t.string :employeename
      t.datetime :leavedate
      t.boolean :isfound
      t.boolean :iscorrectdate

      t.timestamps
    end
  end
end
