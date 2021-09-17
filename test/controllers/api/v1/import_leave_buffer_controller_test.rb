require "test_helper"

class Api::V1::ImportLeaveBufferControllerTest < ActionDispatch::IntegrationTest
  test "should get multiple_insert" do
    get api_v1_import_leave_buffer_multiple_insert_url
    assert_response :success
  end
end
