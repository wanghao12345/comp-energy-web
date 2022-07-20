import {
  useEffect,
  useState,
  FC,
  memo,
  createContext,
  useMemo,
  useRef,
} from 'react';
import { Select, Input, Tree, Checkbox } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { RealContainer, RealOptionContainer } from './style';
import { getRegionTreeList } from '@/apis';
import { EnergyType, EnergyTypeList } from '@/commonInterface';
import { useImmer } from 'use-immer';
const { Option } = Select;

interface region {
  name: string;
  id: number;
}

export interface templageProps {
  energyType: EnergyType;
  area: number[];
  areaID: string[];
  regionList: region[];
  regionTree: any[];
}

const defaultData: templageProps = {
  energyType: EnergyType.Electric,
  area: [],
  areaID: [],
  regionList: [],
  regionTree: [],
};

type IProps = {
  isShowCheckBox?: boolean;
};

// 创造一个上下文
export const TemplateContext = createContext<templageProps>(defaultData);

const MyTemplate: FC<IProps> = memo(({ children, isShowCheckBox }) => {
  const [contextProps, setContextProps] = useImmer(defaultData);
  const regionList = useRef<any>();
  const onChange = (key: string) => {
    const ck = parseInt(key);
    setContextProps((p) => {
      p.energyType = ck;
    });
  };

  const onSelectAreaChange = (selectedKeys: React.Key[], info: any) => {
    setContextProps((p) => {
      p.areaID = selectedKeys as any;
      p.area = selectedKeys.map((value) => {
        return parseInt(value as any);
      });
      console.log(info);
    });
  };

  const initTemplateProps = (regionList: region[], regionTree: any) => {
    setContextProps(
      Object.assign(
        {},
        {
          energyType: defaultData.energyType,
          area: [regionList[1].id],
          areaID: [regionList[1].id.toString()],
          regionList: regionList,
          regionTree: regionTree,
        },
      ),
    );
  };

  const formatRegionList = (data: any) => {
    data.map((item: any) => {
      if (item?.children && item?.children.length) {
        formatRegionList(item?.children);
        regionList.current.push({
          name: item?.name,
          id: parseInt(item?.id || '1'),
        });
      } else {
        regionList.current.push({
          name: item?.name,
          id: parseInt(item?.id || '1'),
        });
      }
    });
  };

  useEffect(() => {
    getRegionTreeList().then((res: any) => {
      if (res?.meta?.code === 200) {
        regionList.current = [];
        formatRegionList(res.data || []);
        initTemplateProps(regionList.current, res.data);
      }
    });
  }, []);

  return (
    <TemplateContext.Provider value={contextProps}>
      <RealContainer>
        <RealOption
          onChange={onChange}
          onSelectAreaChange={onSelectAreaChange}
          templageData={contextProps}
          isShowCheckBox={isShowCheckBox}
        />
        {children}
      </RealContainer>
    </TemplateContext.Provider>
  );
});

type RealOptionProps = {
  onChange: (e: string) => void;
  onSelectAreaChange: (selectedKeys: React.Key[], info: any) => void;
  templageData: templageProps;
  isShowCheckBox?: boolean;
};

export const RealOption: FC<RealOptionProps> = memo(
  ({ onChange, onSelectAreaChange, templageData, isShowCheckBox }) => {
    const [tree, setTree] = useState<any>([]);
    const [nodeName, setNodeName] = useState();
    const [expandedKeys, setExpandedKeys] = useState<any>();
    const [checkedKeys, setCheckedKeys] = useState<any>();
    const [selectedKeys, setSelectedKeys] = useState<any>();
    const [selectAll, setSelectAll] = useState(false);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [allKeys, _setAllKeys] = useState<any>({
      obj: [],
      arr: [],
    });
    const formatTreeData = (data: any) => {
      data.map((item: any) => {
        item.title = item.name;
        item.key = item.id;
        allKeys.obj.push({ key: item.id, title: item.name });
        allKeys.arr.push(item.id);
        if (item.children && item.children.length) {
          formatTreeData(item.children);
        }
      });
    };

    const onSelectNodeChange = (selectedKeys: React.Key[], info: any) => {
      onSelectAreaChange(selectedKeys, info);
      setSelectedKeys(selectedKeys);
      const expend = info?.selectedNodes[0]?.parentId;
      setExpandedKeys(selectedKeys.concat(expend));
      console.log(selectedKeys, info, 'selectedKeys');
    };

    const onChangeName = (e: any) => {
      const value = e?.target?.value;
      setNodeName(value);
      if (isShowCheckBox) {
        setExpandedKeys(checkedKeys);
      } else {
        setExpandedKeys(selectedKeys);
      }
      if (!value) return;
      allKeys.obj.map((item: any) => {
        if (item.title.includes(value)) {
          setExpandedKeys([item.key].concat(expandedKeys));
        }
      });
    };
    const onCheckNodeBox = (
      checked:
        | React.Key[]
        | {
            checked: React.Key[];
            halfChecked: React.Key[];
          },
      info: any,
    ) => {
      if (!(checked as any).length) {
        return;
      }
      onSelectAreaChange(checked as any, info);
      setCheckedKeys(checked);
      const expend = info?.node?.parentId || '';
      setExpandedKeys((checked as any).concat([expend]));
      console.log(checked, 'check');
    };

    const onCheckboxShift = (all: boolean) => {
      setSelectAll(all);
      if (all) {
        setCheckedKeys(allKeys.arr);
        setExpandedKeys(allKeys.arr);
      } else {
        // setCheckedKeys([]);
      }
    };

    const onExpand = (newExpandedKeys: any[]) => {
      setExpandedKeys(newExpandedKeys);
      setAutoExpandParent(false);
      console.log(newExpandedKeys, 'onExpand');
    };

    // const treeData = useMemo(() => {
    //   const loop = (data: DataNode[]): DataNode[] =>
    //     data.map(item => {
    //       const strTitle = item.title as string;
    //       const index = strTitle.indexOf(nodeName);
    //       const beforeStr = strTitle.substring(0, index);
    //       const afterStr = strTitle.slice(index + nodeName.length);
    //       const title =
    //         index > -1 ? (
    //           <span>
    //             {beforeStr}
    //             <span className="site-tree-search-value">{nodeName}</span>
    //             {afterStr}
    //           </span>
    //         ) : (
    //           <span>{strTitle}</span>
    //         );
    //       if (item.children) {
    //         return { title, key: item.key, children: loop(item.children) };
    //       }

    //       return {
    //         title,
    //         key: item.key,
    //       };
    //     });

    //   return loop(tree);
    // }, [tree, nodeName]);

    const getNodeList = (data: any) => {
      if (data.length) {
        formatTreeData(data);
        setTree([...data]);
        setExpandedKeys(templageData.areaID);
        if (isShowCheckBox) {
          setCheckedKeys(templageData.areaID);
        } else {
          setSelectedKeys(templageData.areaID);
        }
      }
    };
    useEffect(() => {
      getNodeList(templageData.regionTree);
    }, [templageData.regionTree]);

    return (
      <RealOptionContainer>
        <Select
          size="large"
          defaultValue={templageData.energyType as any}
          onChange={onChange}
        >
          {EnergyTypeList.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Input
          size="large"
          suffix={<SearchOutlined />}
          placeholder="节点名称"
          value={nodeName}
          onChange={onChangeName}
        />
        {isShowCheckBox ? (
          <div className="radioGroup">
            <Checkbox
              onChange={() => {
                onCheckboxShift(false);
              }}
              checked={!selectAll}
            >
              是否级联
            </Checkbox>
            <Checkbox
              onChange={() => {
                onCheckboxShift(true);
              }}
              checked={selectAll}
            >
              全选
            </Checkbox>
          </div>
        ) : null}
        <Tree
          onSelect={onSelectNodeChange}
          onCheck={onCheckNodeBox}
          treeData={tree}
          selectedKeys={selectedKeys}
          checkable={isShowCheckBox}
          selectable={!isShowCheckBox}
          autoExpandParent={autoExpandParent}
          defaultExpandAll
          defaultExpandParent
          expandedKeys={expandedKeys}
          checkedKeys={checkedKeys}
          onExpand={onExpand}
          showLine
          icon={<PlusOutlined />}
        />
      </RealOptionContainer>
    );
  },
);

MyTemplate.displayName = 'MyTemplate';

export default MyTemplate;
