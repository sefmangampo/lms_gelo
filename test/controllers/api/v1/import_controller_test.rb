require "test_helper"

class Api::V1::ImportControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get api_v1_import_new_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_import_create_url
    assert_response :success
  end
end
